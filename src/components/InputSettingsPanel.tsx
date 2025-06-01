import { useEffect, useRef, useState } from 'react';
import type { InputComponent } from '../constants';
import {
  Checkbox,
  Input,
  Label,
  type CheckboxOnChangeData,
} from '@fluentui/react-components';
import { camelCase } from 'change-case';
import { SelectOptionsEditor } from './SelectOptionsEditor';

interface Props {
  component: InputComponent | null;
  onChange: (c: InputComponent | null) => void;
}

export function InputSettingsPanel({ component, onChange }: Props) {
  const [name, setName] = useState(component?.name || '');
  const [isRequired, setIsRequired] = useState(component?.isRequired || false);
  const [isFilterable, setIsFilterable] = useState(
    component?.isFilterable || false,
  );
  const [options, setOptions] = useState<string[] | undefined>(
    component?.options,
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutRefSecond = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutRefThird = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (component) {
      setName(component.label);
      setIsRequired(component.isRequired);
      setIsFilterable(component.isFilterable);
      setOptions(component.options);
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
      onChange({ ...component, label: value, name: camelCase(value) });
    }, 500);
  };

  const handleChangeCheckbox = (
    d: CheckboxOnChangeData,
    change: 'isRequired' | 'isFilterable',
  ) => {
    const checked = d.checked;

    if (timeoutRefSecond.current && change === 'isFilterable') {
      clearTimeout(timeoutRefSecond.current);
    }

    if (timeoutRefThird.current && change === 'isRequired') {
      clearTimeout(timeoutRefThird.current);
    }

    if (change === 'isFilterable') {
      setIsFilterable(Boolean(checked));
      timeoutRefSecond.current = setTimeout(() => {
        onChange({
          ...component,
          name,
          isRequired,
          isFilterable: Boolean(checked),
        });
      }, 500);
    }
    if (change === 'isRequired') {
      setIsRequired(Boolean(checked));
      timeoutRefThird.current = setTimeout(() => {
        onChange({
          ...component,
          name,
          isFilterable,
          isRequired: Boolean(checked),
        });
      }, 500);
    }
  };

  const handleChangeOptions = (newOptions: string[]) => {
    onChange({ ...component, options: newOptions });
    setOptions(newOptions);
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
      <Input
        disabled={component.isMandatory}
        value={name}
        onChange={handleChange}
      />

      <Checkbox
        label="Required"
        disabled={component.isMandatory}
        checked={isRequired}
        onChange={(_, d) => handleChangeCheckbox(d, 'isRequired')}
      />
      <Checkbox
        label="Filterable"
        disabled={component.isMandatory}
        checked={isFilterable}
        onChange={(_, d) => handleChangeCheckbox(d, 'isFilterable')}
      />
      {component.type === 'select' ? (
        <div>
          <Label>Options</Label>
          <SelectOptionsEditor
            disabled={component.isMandatory}
            options={options || []}
            onOptionsChange={(newOptions) => {
              handleChangeOptions(newOptions);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
