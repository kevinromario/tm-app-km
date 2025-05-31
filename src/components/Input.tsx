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
};

type InputTextAreaType = TextareaProps & {
  placeholder?: string;
  inputId: string;
  required: boolean;
  showLabel: boolean;
  handleChange: HandleChangeType;
  type: FieldType;
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
};

type InputTagType = {
  inputId: string;
  required: boolean;
  showLabel: boolean;
  handleChange: HandleChangeType;
  type: FieldType;
  defaultValue?: string[];
};

export function InputText(props: InputTextType) {
  return (
    <>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Input
        id={props.inputId}
        defaultValue={props.defaultValue}
        name={props.inputId}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) =>
          props.handleChange(props.inputId, e.target.value, props.type)
        }
      />
    </>
  );
}

export function InputEmail(props: InputTextType) {
  return (
    <>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Input
        id={props.inputId}
        defaultValue={props.defaultValue}
        name={props.inputId}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) =>
          props.handleChange(props.inputId, e.target.value, props.type)
        }
      />
    </>
  );
}

export function InputDate(props: InputTextType) {
  const formatted =
    props.defaultValue && format(new Date(props.defaultValue), 'yyyy-MM-dd');
  return (
    <>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Input
        id={props.inputId}
        defaultValue={formatted}
        name={props.inputId}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) =>
          props.handleChange(props.inputId, e.target.value, props.type)
        }
      />
    </>
  );
}

export function InputDateTime(props: InputTextType) {
  const formatted =
    props.defaultValue &&
    format(new Date(props.defaultValue), 'YYYY-MM-DDTHH:mm');

  return (
    <>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Input
        id={props.inputId}
        defaultValue={formatted}
        name={props.inputId}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) =>
          props.handleChange(props.inputId, e.target.value, props.type)
        }
      />
    </>
  );
}

export function InputSelect(props: InputSelectType) {
  return (
    <>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Dropdown
        defaultValue={props.defaultValue}
        id={props.inputId}
        name={props.inputId}
        clearable
        placeholder="Select a priority"
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
    </>
  );
}

export function InputTextArea(props: InputTextAreaType) {
  return (
    <>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <Textarea
        name={props.inputId}
        defaultValue={props.defaultValue}
        onChange={(e) =>
          props.handleChange(props.inputId, e.target.value, props.type)
        }
      />
    </>
  );
}

export function InputTag(props: InputTagType) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => {
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
    <>
      {props.showLabel && (
        <Label required={props.required} htmlFor={`${props.inputId}-input`}>
          {props.inputId}
        </Label>
      )}
      <TagPicker
        id={props.inputId}
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
    </>
  );
}
