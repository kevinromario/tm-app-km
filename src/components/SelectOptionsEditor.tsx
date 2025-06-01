import { useState } from 'react';
import { Button, Input } from '@fluentui/react-components';

interface Props {
  options: string[];
  onOptionsChange: (opts: string[]) => void;
  disabled: boolean;
}

export function SelectOptionsEditor({
  options,
  onOptionsChange,
  disabled,
}: Props) {
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    const trimmed = newOption.trim();
    if (trimmed && !options.includes(trimmed)) {
      onOptionsChange([...options, trimmed]);
      setNewOption('');
    }
  };

  const handleRemoveOption = (index: number) => {
    const updated = [...options];
    updated.splice(index, 1);
    onOptionsChange(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {options.map((opt, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 0',
          }}
        >
          <span style={{ width: 20 }}>{idx + 1}.</span>
          <span style={{ flexGrow: 1 }}>{opt}</span>
          {disabled ? null : (
            <Button
              size="small"
              appearance="subtle"
              onClick={() => handleRemoveOption(idx)}
            >
              Remove
            </Button>
          )}
        </div>
      ))}

      {disabled ? null : (
        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <Input
            value={newOption}
            placeholder="Add new option"
            onChange={(e) => setNewOption(e.target.value)}
            onKeyDown={(e: { key: string }) => {
              if (e.key === 'Enter') handleAddOption();
            }}
          />
          <Button onClick={handleAddOption}>Add</Button>
        </div>
      )}
    </div>
  );
}
