import { Button } from '@fluentui/react-components';
import type { ColumnType, FormDataType } from '../constants';
import {
  InputDate,
  InputDateTime,
  InputEmail,
  InputSelect,
  InputText,
} from './Input';
import { useState, type FormEvent } from 'react';

type FilterType = {
  listColumns: ColumnType[];
};

export default function Filter(props: FilterType) {
  const [formData, setFormData] = useState<FormDataType>({});

  const handleChange = (
    name: string,
    value: string | number | boolean | string[] | null,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    console.log(formData);
    alert('form submitted!');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        borderBottom: '1px solid lightGray',
        padding: 10,
        justifyContent: 'space-between',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '7px',
      }}
    >
      {props.listColumns.map((column) => {
        if (!column.filterable) return;
        if (column.type === 'email') {
          return (
            <InputEmail
              inputId={column.name}
              required={false}
              showLabel={false}
              placeholder={`Input ${column.label}`}
              handleChange={handleChange}
            />
          );
        }
        if (column.type === 'date') {
          return (
            <InputDate
              inputId={column.name}
              required={false}
              showLabel={false}
              placeholder={`Input ${column.label}`}
              handleChange={handleChange}
            />
          );
        }
        if (column.type === 'date-time') {
          return (
            <InputDateTime
              inputId={column.name}
              required={false}
              showLabel={false}
              type="datetime-local"
              placeholder={`Input ${column.label}`}
              handleChange={handleChange}
            />
          );
        }
        if (column.type === 'select') {
          return (
            <InputSelect
              inputId={column.name}
              required={false}
              showLabel={false}
              placeholder={`Select ${column.label}`}
              options={column.options || []}
              handleChange={handleChange}
            />
          );
        }
        if (column.type === 'text-area') {
          return (
            <InputText
              inputId={column.name}
              required={false}
              showLabel={false}
              placeholder={`Input ${column.label}`}
              handleChange={handleChange}
            />
          );
        }

        return (
          <InputText
            inputId={column.name}
            required={false}
            showLabel={false}
            placeholder={`Input ${column.label}`}
            handleChange={handleChange}
          />
        );
      })}
      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Button type="submit" appearance="primary">
          Search
        </Button>
      </div>
    </form>
  );
}
