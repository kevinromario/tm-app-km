import type { InputComponent } from '../constants';
import {
  Checkbox,
  Dropdown,
  Input,
  Label,
  Option,
} from '@fluentui/react-components';

interface Props {
  component: InputComponent | null;
  onChange: (c: InputComponent | null) => void;
}

export function InputSettingsPanel({ component, onChange }: Props) {
  if (!component) return <div>Select a component</div>;

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
      <Input
        value={component.name}
        onChange={(e) => onChange({ ...component, name: e.target.value })}
      />
      <Label>Column Span</Label>
      <Dropdown
        value={String(component.colSpan)}
        onOptionSelect={(_, data) => {
          const span = parseInt(data.optionValue || '1') as 1 | 2;
          onChange({ ...component, colSpan: span });
        }}
      >
        <Option value="1">1 Column</Option>
        <Option value="2">2 Columns</Option>
      </Dropdown>
      <Checkbox
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
      />
    </div>
  );
}
