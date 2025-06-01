/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dropdown,
  Option,
  Input,
  type InputProps,
  type TextareaProps,
  Textarea,
  TagPicker,
  TagPickerControl,
  TagPickerInput,
  TagPickerGroup,
  Tag,
  type TagPickerProps,
  Avatar,
  Label,
} from '@fluentui/react-components';
import { useEffect, useState, type ChangeEvent } from 'react';
import type { FieldType } from '../constants';
import { format } from 'date-fns';

type HandleChangeType = (
  name: string,
  value: string | number | boolean | string[] | null,
  type: FieldType,
) => void;

type InputTextType = InputProps & {
  placeholder?: string;
  inputId: string;
  required: boolean;
  showLabel: boolean;
  handleChange: HandleChangeType;
  type: FieldType;
  disabled?: boolean;
};

type InputTextAreaType = TextareaProps & {
  placeholder?: string;
  inputId: string;
  required: boolean;
  showLabel: boolean;
  handleChange: HandleChangeType;
  type: FieldType;
  disabled?: boolean;
};

type InputSelectType = {
  placeholder?: string;
  inputId: string;
  options: string[];
  required: boolean;
  showLabel: boolean;
  handleChange: HandleChangeType;
  type: FieldType;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
};

type InputTagType = {
  inputId: string;
  required: boolean;
  showLabel: boolean;
  handleChange: HandleChangeType;
  type: FieldType;
  defaultValue?: string[];
  value?: string;
  disabled?: boolean;
};

export function InputText(props: InputTextType) {
  const inputProps: { value?: string; defaultValue?: string } = {};

  if (props.value !== undefined) {
    inputProps.value = props.value;
  } else if (props.defaultValue !== undefined) {
    inputProps.defaultValue = props.defaultValue;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Input
        id={props.inputId}
        disabled={props.disabled}
        name={props.inputId}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) =>
          props.handleChange(props.inputId, e.target.value, props.type)
        }
      />
    </div>
  );
}

export function InputEmail(props: InputTextType) {
  const inputProps: { value?: string; defaultValue?: string } = {};

  if (props.value !== undefined) {
    inputProps.value = props.value;
  } else if (props.defaultValue !== undefined) {
    inputProps.defaultValue = props.defaultValue;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Input
        id={props.inputId}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        name={props.inputId}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) =>
          props.handleChange(props.inputId, e.target.value, props.type)
        }
      />
    </div>
  );
}

export function InputDate(props: InputTextType) {
  const inputProps: { value?: string; defaultValue?: string } = {};

  const isValidDate = (date: Date) => !isNaN(date.getTime());

  if (props.value !== undefined) {
    const date = new Date(props.value);
    inputProps.value = isValidDate(date) ? format(date, 'yyyy-MM-dd') : '';
  } else if (props.defaultValue !== undefined) {
    const date = new Date(props.defaultValue);
    inputProps.defaultValue = isValidDate(date)
      ? format(date, 'yyyy-MM-dd')
      : '';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Input
        id={props.inputId}
        disabled={props.disabled}
        name={props.inputId}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) =>
          props.handleChange(props.inputId, e.target.value, props.type)
        }
      />
    </div>
  );
}

export function InputDateTime(props: InputTextType) {
  const inputProps: { value?: string; defaultValue?: string } = {};

  if (props.value !== undefined) {
    inputProps.value = format(new Date(props.value), 'yyyy-MM-dd');
  } else if (props.defaultValue !== undefined) {
    inputProps.defaultValue = format(
      new Date(props.defaultValue),
      "yyyy-MM-dd'T'HH:mm",
    );
  }

  const isValidDate = (date: Date) => !isNaN(date.getTime());

  if (props.value !== undefined) {
    const date = new Date(props.value);
    inputProps.value = isValidDate(date)
      ? format(new Date(props.value), "yyyy-MM-dd'T'HH:mm")
      : '';
  } else if (props.defaultValue !== undefined) {
    const date = new Date(props.defaultValue);
    inputProps.defaultValue = isValidDate(date)
      ? format(new Date(props.defaultValue), "yyyy-MM-dd'T'HH:mm")
      : '';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Input
        id={props.inputId}
        disabled
        name={props.inputId}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) =>
          props.handleChange(props.inputId, e.target.value, props.type)
        }
      />
    </div>
  );
}

export function InputSelect(props: InputSelectType) {
  const inputProps: {
    defaultValue?: string;
    selectedOptions?: string[];
  } = {};

  if (props.value !== undefined) {
    inputProps.selectedOptions = [props.value];
  } else if (props.defaultValue !== undefined) {
    inputProps.defaultValue = props.defaultValue;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Dropdown
        disabled={props.disabled}
        id={props.inputId}
        name={props.inputId}
        placeholder={props.placeholder}
      >
        {props.options.map((option) => (
          <Option
            onClick={() =>
              props.handleChange(props.inputId, option, props.type)
            }
            key={option}
          >
            {option}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
}

export function InputTextArea(props: InputTextAreaType) {
  const inputProps: { value?: string; defaultValue?: string } = {};

  if (props.value !== undefined) {
    inputProps.value = props.value;
  } else if (props.defaultValue !== undefined) {
    inputProps.defaultValue = props.defaultValue;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Textarea
        name={props.inputId}
        disabled={props.disabled}
        onChange={(e) =>
          props.handleChange(props.inputId, e.target.value, props.type)
        }
      />
    </div>
  );
}

export function InputTag(props: InputTagType) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (
    _: any,
    data: any,
  ) => {
    setSelectedOptions(data.selectedOptions);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && inputValue) {
      setInputValue('');
      setSelectedOptions((curr) => {
        props.handleChange(
          props.inputId,
          curr.includes(inputValue) ? curr : [...curr, inputValue],
          props.type,
        );
        return curr.includes(inputValue) ? curr : [...curr, inputValue];
      });
    }
  };

  useEffect(() => {
    if (props.defaultValue) {
      setSelectedOptions(props.defaultValue);
    }
  }, [props.defaultValue]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <TagPicker
        id={props.inputId}
        disabled={props.disabled}
        name={props.inputId}
        noPopover
        onOptionSelect={onOptionSelect}
        selectedOptions={selectedOptions}
      >
        <TagPickerControl>
          <TagPickerGroup aria-label="Selected Employees">
            {selectedOptions.map((option, index) => (
              <Tag
                key={index}
                value={option}
                media={<Avatar aria-hidden name={option} color="colorful" />}
              >
                {option}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            aria-label="Add Employees"
          />
        </TagPickerControl>
      </TagPicker>
    </div>
  );
}
