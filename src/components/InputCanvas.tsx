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

const DeleteIcon = bundleIcon(DeleteFilled, DeleteRegular);

interface Props {
  formStructure: FormStructure;
  setFormStructure: Dispatch<SetStateAction<FormStructure>>;
  setSelectedComponent: (c: InputComponent) => void;
}

function RenderComponent(props: InputComponent) {
  console.log(props);
  if (props.type === 'array') {
    return (
      <InputTag
        disabled
        showLabel
        required={false}
        inputId={props.name}
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
        inputId={props.name}
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
        inputId={props.name}
        handleChange={() => null}
      />
    );
  } else if (props.type === 'email') {
    return (
      <InputEmail
        disabled
        showLabel
        required={false}
        inputId={props.name}
        type={props.type}
        handleChange={() => null}
      />
    );
  } else if (props.type === 'select') {
    return (
      <InputSelect
        disabled
        showLabel
        inputId={props.name}
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
        inputId={props.name}
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
        inputId={props.name}
        type={props.type}
        handleChange={() => null}
      />
    );
  }
}

export function InputCanvas({
  formStructure,
  setFormStructure,
  setSelectedComponent,
}: Props) {
  const { setNodeRef } = useDroppable({ id: 'canvas' });

  const handleDelete = (id: string) => {
    setFormStructure((prev) => ({
      rows: prev.rows.map((row: FormRow) => ({
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
                  {RenderComponent(col)}
                  <Button
                    appearance="subtle"
                    style={{ position: 'absolute', top: 4, right: 4 }}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(col.id);
                    }}
                    icon={<DeleteIcon />}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
