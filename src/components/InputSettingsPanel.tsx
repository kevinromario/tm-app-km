import { useEffect, useRef, useState } from 'react';
import type { InputComponent } from '../constants';
import { Input, Label } from '@fluentui/react-components';
import { camelCase } from 'change-case';

interface Props {
  component: InputComponent | null;
  onChange: (c: InputComponent | null) => void;
}

export function InputSettingsPanel({ component, onChange }: Props) {
  const [name, setName] = useState(component?.name || '');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (component) {
      setName(component.name);
    }
  }, [component]);

  if (!component) return <div>Select a component</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onChange({ ...component, title: value, name: camelCase(value) });
    }, 500);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '12px',
      }}
    >
      <Label>Name</Label>
      <Input value={name} onChange={handleChange} />
      {/* TODO: Improvement to support colspan and required */}
      {/* <Label>Column Span</Label>
      <Dropdown
        value={String(component.colSpan)}
        onOptionSelect={(_, data) => {
          const span = parseInt(data.optionValue || '1') as 1 | 2;
          onChange({ ...component, colSpan: span });
        }}
      >
        <Option value="1">1 Column</Option>
        <Option value="2">2 Columns</Option>
      </Dropdown> */}
      {/* <Checkbox
        label="Required"
        checked={component.isRequired}
        onChange={(_, d) =>
          onChange({ ...component, isRequired: d.checked ?? false })
        }
      />
      <Checkbox
        label="Filterable"
        checked={component.isFilterable}
        onChange={(_, d) =>
          onChange({ ...component, isFilterable: d.checked ?? false })
        }
      /> */}
    </div>
  );
}
