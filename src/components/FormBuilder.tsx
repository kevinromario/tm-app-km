import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { InputPalette } from './InputPalette';
import { InputCanvas } from './InputCanvas';
import { InputSettingsPanel } from './InputSettingsPanel';
import type { FieldType, FormStructure, InputComponent } from '../constants';
import { Button } from '@fluentui/react-components';
import { v4 as uuidv4 } from 'uuid';
import { useSaveFormSetting } from '../hooks/useSaveFormSetting';
import DragItem from './DragItem';

export default function FormBuilder() {
  const [activeType, setActiveType] = useState(null);
  const {
    mutateAsync: saveFormSetting,
    isLoading,
    isSuccess,
    isError,
  } = useSaveFormSetting();
  const [formStructure, setFormStructure] = useState<FormStructure>({
    rows: [],
  });
  const [selectedComponent, setSelectedComponent] =
    useState<InputComponent | null>(null);

  const handleSave = async () => {
    try {
      const res = await saveFormSetting(formStructure);
      if (res.ok) alert('Form saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan form');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveType(null);
    const { active, over } = event;
    if (!over || !active.data?.current) return;

    const isFromPalette = active.data.current?.from !== 'canvas';

    if (isFromPalette) {
      const draggedType = active.data.current.type as string;
      if (!draggedType) return;

      const newComponent: InputComponent = {
        id: uuidv4(),
        type: draggedType as FieldType,
        name: `${draggedType}-${Date.now()}`,
        isRequired: false,
        isFilterable: false,
        colSpan: 1,
      };

      setFormStructure((prev) => {
        const updated = prev.rows.map((row) => ({
          ...row,
          columns: [...row.columns],
        }));
        const lastRow = updated[updated.length - 1];
        if (!lastRow || lastRow.columns.length >= 2) {
          updated.push({ id: uuidv4(), columns: [newComponent] });
        } else {
          lastRow.columns.push(newComponent);
        }
        return { rows: updated };
      });
    } else {
      setFormStructure((prev) => {
        const updatedRows = prev.rows.map((row) => {
          const activeIndex = row.columns.findIndex(
            (col) => col.id === active.id,
          );
          const overIndex = row.columns.findIndex((col) => col.id === over.id);
          if (activeIndex === -1 || overIndex === -1) return row;

          const newCols = [...row.columns];
          const [moved] = newCols.splice(activeIndex, 1);
          newCols.splice(overIndex, 0, moved);
          return { ...row, columns: newCols };
        });
        return { rows: updatedRows };
      });
    }
  };

  function handleDragStart(event: DragStartEvent) {
    setActiveType(event.active.data.current?.type);
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
        <div
          style={{
            width: '20%',
            padding: '8px',
            borderRight: '1px solid #ccc',
          }}
        >
          <InputPalette />
        </div>
        <div
          style={{
            width: '60%',
            padding: '8px',
            borderRight: '1px solid #ccc',
          }}
        >
          <InputCanvas
            formStructure={formStructure}
            setFormStructure={setFormStructure}
            setSelectedComponent={setSelectedComponent}
          />
        </div>
        <div style={{ width: '20%', padding: '8px' }}>
          <InputSettingsPanel
            component={selectedComponent}
            onChange={(updated) => {
              if (!updated) return;
              setFormStructure((prev) => ({
                rows: prev.rows.map((row) => ({
                  ...row,
                  columns: row.columns.map((col) =>
                    col?.id === updated.id ? updated : col,
                  ),
                })),
              }));
            }}
          />
          <Button onClick={handleSave} appearance="primary">
            Save
          </Button>
        </div>
      </div>
      <DragOverlay>
        {activeType ? <DragItem type={activeType} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
