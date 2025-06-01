import { useDroppable } from '@dnd-kit/core';
import type { FormRow, FormStructure, InputComponent } from '../constants';
import { Button } from '@fluentui/react-components';
import {
  InputDate,
  InputDateTime,
  InputEmail,
  InputSelect,
  InputTag,
  InputText,
  InputTextArea,
} from './Input';
import { DeleteRegular, DeleteFilled, bundleIcon } from '@fluentui/react-icons';
import type { Dispatch, SetStateAction } from 'react';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DeleteIcon = bundleIcon(DeleteFilled, DeleteRegular);

interface Props {
  formStructure: FormStructure;
  setFormStructure: Dispatch<SetStateAction<FormStructure>>;
  setSelectedComponent: (c: InputComponent) => void;
}

function RenderComponent(props: InputComponent) {
  if (props.type === 'array') {
    return (
      <InputTag
        disabled
        showLabel
        required={false}
        label={`${props.label} (${props.type})`}
        name={props.name}
        handleChange={() => null}
        type={props.type}
      />
    );
  } else if (props.type === 'date') {
    return (
      <InputDate
        disabled
        showLabel
        required={false}
        label={`${props.label} (${props.type})`}
        name={props.name}
        type={props.type}
        handleChange={() => null}
      />
    );
  } else if (props.type === 'datetime-local') {
    return (
      <InputDateTime
        disabled
        type={props.type}
        showLabel
        required={false}
        label={`${props.label} (${props.type})`}
        name={props.name}
        handleChange={() => null}
      />
    );
  } else if (props.type === 'email') {
    return (
      <InputEmail
        disabled
        showLabel
        required={false}
        label={`${props.label} (${props.type})`}
        name={props.name}
        type={props.type}
        handleChange={() => null}
      />
    );
  } else if (props.type === 'select') {
    return (
      <InputSelect
        disabled
        showLabel
        label={`${props.label} (${props.type})`}
        name={props.name}
        required={false}
        type={props.type}
        handleChange={() => null}
        options={[]}
      />
    );
  } else if (props.type === 'text-area') {
    return (
      <InputTextArea
        disabled
        showLabel
        required={false}
        label={`${props.label} (${props.type})`}
        name={props.name}
        type={props.type}
        handleChange={() => null}
      />
    );
  } else {
    return (
      <InputText
        disabled
        showLabel
        required={false}
        label={`${props.label} (${props.type})`}
        name={props.name}
        type={props.type}
        handleChange={() => null}
      />
    );
  }
}

function DraggableCol({
  col,
  onClick,
  onDelete,
}: {
  col: InputComponent;
  onClick: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: col.id,
      data: { id: col.id, type: col.type, from: 'canvas' },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    flex: 1,
    border: '1px solid #ccc',
    padding: '8px',
    minHeight: '60px',
    backgroundColor: 'white',
    cursor: 'move',
  };

  return (
    <div
      ref={setNodeRef}
      style={{ position: 'relative', ...style }}
      {...attributes}
      {...listeners}
    >
      <div
        onClick={onClick}
        onPointerDown={(e: { stopPropagation: () => void }) => {
          e.stopPropagation();
        }}
      >
        {RenderComponent(col)}
      </div>
      {col.isMandatory ? null : (
        <Button
          appearance="subtle"
          style={{ position: 'absolute', top: 4, right: 4 }}
          size="small"
          onPointerDown={(e: { stopPropagation: () => void }) => {
            e.stopPropagation();
          }}
          onClick={(e: { stopPropagation: () => void }) => {
            e.stopPropagation();
            onDelete();
          }}
          icon={<DeleteIcon />}
        />
      )}
    </div>
  );
}

export function InputCanvas({
  formStructure,
  setFormStructure,
  setSelectedComponent,
}: Props) {
  const { setNodeRef } = useDroppable({ id: 'canvas' });

  const handleDelete = (id: string) => {
    setFormStructure((prev) => ({
      rows: prev.rows
        .map((row: FormRow) => ({
          ...row,
          columns: row.columns.filter((col) => col?.id !== id),
        }))
        .filter((row) => row.columns.length > 0), // Hapus row kosong
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
      {formStructure.rows.map((row) => {
        return (
          <div key={row.id} style={{ display: 'flex', gap: '8px' }}>
            <SortableContext
              items={row.columns.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {row.columns.map((col) => {
                return (
                  <DraggableCol
                    key={col?.id}
                    col={col}
                    onClick={() => setSelectedComponent(col)}
                    onDelete={() => handleDelete(col.id)}
                  />
                );
              })}
            </SortableContext>
          </div>
        );
      })}
    </div>
  );
}
