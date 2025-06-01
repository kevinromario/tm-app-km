import { useDroppable } from '@dnd-kit/core';
import type { FormStructure, InputComponent } from '../constants';
import { Button } from '@fluentui/react-components';

interface Props {
  formStructure: FormStructure;
  setFormStructure: (f: FormStructure) => void;
  setSelectedComponent: (c: InputComponent) => void;
}

export function InputCanvas({
  formStructure,
  setFormStructure,
  setSelectedComponent,
}: Props) {
  const { setNodeRef } = useDroppable({ id: 'canvas' });

  const handleDelete = (id: string) => {
    setFormStructure((prev) => ({
      rows: prev.rows.map((row) => ({
        ...row,
        columns: row.columns.map((col) => (col?.id === id ? null : col)),
      })),
    }));
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {formStructure.rows.map((row, i) => {
        let usedCols = 0;
        return (
          <div key={row.id} style={{ display: 'flex', gap: '8px' }}>
            {row.columns.map((col, j) => {
              if (!col) return null;
              usedCols += col.colSpan;
              return (
                <div
                  key={col.id}
                  style={{
                    flex: col.colSpan,
                    border: '1px solid #ccc',
                    padding: '8px',
                    minHeight: '60px',
                    position: 'relative',
                    backgroundColor: 'white',
                  }}
                  onClick={() => setSelectedComponent(col)}
                >
                  <div>{col.name}</div>
                  <Button
                    style={{ position: 'absolute', top: 4, right: 4 }}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(col.id);
                    }}
                  >
                    ✕
                  </Button>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
