import { Button } from '@fluentui/react-components';
import type { ColumnType } from '../constants';
import {
  InputDate,
  InputDateTime,
  InputEmail,
  InputSelect,
  InputText,
} from './Input';

type FilterType = {
  listColumns: ColumnType[];
};

export default function Filter(props: FilterType) {
  return (
    <div
      style={{
        borderBottom: '1px solid lightGray',
        padding: 10,
        justifyContent: 'space-between',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '7px',
      }}
    >
      {props.listColumns.map((column) => {
        if (!column.filterable) return;
        if (column.type === 'email') {
          return (
            <InputEmail
              inputId={column.name}
              placeholder={`Input ${column.label}`}
            />
          );
        }
        if (column.type === 'date') {
          return (
            <InputDate
              inputId={column.name}
              placeholder={`Input ${column.label}`}
            />
          );
        }
        if (column.type === 'date-time') {
          return (
            <InputDateTime
              inputId={column.name}
              type="datetime-local"
              placeholder={`Input ${column.label}`}
            />
          );
        }
        if (column.type === 'select') {
          return (
            <InputSelect
              inputId={column.name}
              placeholder={`Select ${column.label}`}
              options={column.options || []}
            />
          );
        }
        if (column.type === 'text-area') {
          return (
            <InputText
              inputId={column.name}
              placeholder={`Input ${column.label}`}
            />
          );
        }

        return (
          <InputText
            inputId={column.name}
            placeholder={`Input ${column.label}`}
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
        <Button appearance="primary">Search</Button>
      </div>
    </div>
  );
}
