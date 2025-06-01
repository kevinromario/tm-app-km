import { Button } from '@fluentui/react-components';
import type {
  ColumnTable,
  FieldType,
  FilterDataType,
  FormDataType,
} from '../constants';
import {
  InputDate,
  InputDateTime,
  InputEmail,
  InputSelect,
  InputText,
} from './Input';
import { useState, type FormEvent } from 'react';

type FilterType = {
  listColumns: ColumnTable[];
  onSubmit: (props: FilterDataType) => void;
};

export default function Filter(props: FilterType) {
  const [formData, setFormData] = useState<FormDataType>({});

  const handleChange = (
    name: string,
    value: string | number | boolean | string[] | null,
    type: FieldType,
  ) => {
    let parsedValue: string | number | boolean | string[] | Date | null = value;

    if (type === 'date' || type === 'datetime-local') {
      parsedValue = value ? new Date(value as string).toISOString() : null;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };
  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const filterData: FilterDataType = {};

    for (const [key, value] of Object.entries(formData)) {
      const column = props.listColumns.find((col) => col.name === key);

      if (column) {
        filterData[key] = {
          value,
          type: column.type,
        };
      }
    }

    props.onSubmit(filterData);
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
        if (!column.isFilterable) return;
        if (column.type === 'email') {
          return (
            <InputEmail
              value={(formData[column.name] as string) ?? ''}
              key={column.name}
              inputId={column.name}
              required={column.isRequired}
              showLabel={false}
              placeholder={`Input ${column.label}`}
              handleChange={handleChange}
              type={column.type}
              name={column.name}
              label={column.label}
            />
          );
        }
        if (column.type === 'date') {
          return (
            <InputDate
              value={(formData[column.name] as string) ?? ''}
              key={column.name}
              inputId={column.name}
              required={column.isRequired}
              showLabel={false}
              placeholder={`Input ${column.label}`}
              handleChange={handleChange}
              type={column.type}
              name={column.name}
              label={column.label}
            />
          );
        }
        if (column.type === 'datetime-local') {
          return (
            <InputDateTime
              value={(formData[column.name] as string) ?? ''}
              key={column.name}
              inputId={column.name}
              required={column.isRequired}
              showLabel={false}
              placeholder={`Input ${column.label}`}
              handleChange={handleChange}
              type={column.type}
              name={column.name}
              label={column.label}
            />
          );
        }
        if (column.type === 'select') {
          return (
            <InputSelect
              value={(formData[column.name] as string) ?? ''}
              key={column.name}
              name={column.name}
              required={column.isRequired}
              showLabel={false}
              placeholder={`Select ${column.label}`}
              options={column.options || []}
              handleChange={handleChange}
              type={column.type}
              label={column.label}
            />
          );
        }
        if (column.type === 'text-area') {
          return (
            <InputText
              value={(formData[column.name] as string) ?? ''}
              key={column.name}
              inputId={column.name}
              required={column.isRequired}
              showLabel={false}
              placeholder={`Input ${column.label}`}
              handleChange={handleChange}
              type="text"
              name={column.name}
              label={column.label}
            />
          );
        }

        return (
          <InputText
            value={(formData[column.name] as string) ?? ''}
            key={column.name}
            inputId={column.name}
            required={column.isRequired}
            showLabel={false}
            placeholder={`Input ${column.label}`}
            handleChange={handleChange}
            type="text"
            name={column.name}
            label={column.label}
          />
        );
      })}
      <div
        style={{
          gridColumn: '1 / -1',
          display: 'flex',
          justifyContent: 'flex-start',
          gap: 10,
        }}
      >
        <Button type="submit" appearance="primary">
          Search
        </Button>
        <Button
          onClick={() => {
            setFormData({});
            props.onSubmit({});
          }}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
