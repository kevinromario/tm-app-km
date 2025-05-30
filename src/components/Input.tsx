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
} from '@fluentui/react-components';
import { type ChangeEvent, type Dispatch, type SetStateAction } from 'react';

type InputTextType = InputProps & {
  placeholder?: string;
  inputId: string;
};

type InputTextAreaType = TextareaProps & {
  placeholder?: string;
  inputId: string;
};

type InputSelectType = {
  placeholder?: string;
  inputId: string;
  options: string[];
};

type InputTagType = {
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
};

export function InputText(props: InputTextType) {
  return (
    <Input
      id={props.inputId}
      {...props}
      type="text"
      placeholder={props.placeholder}
    />
  );
}

export function InputEmail(props: InputTextType) {
  return (
    <Input
      id={props.inputId}
      {...props}
      type="email"
      placeholder={props.placeholder}
    />
  );
}

export function InputDate(props: InputTextType) {
  return (
    <Input
      id={props.inputId}
      {...props}
      type="date"
      placeholder={props.placeholder}
    />
  );
}

export function InputDateTime(props: InputTextType) {
  return (
    <Input
      id={props.inputId}
      {...props}
      type="datetime-local"
      placeholder={props.placeholder}
    />
  );
}

export function InputSelect(props: InputSelectType) {
  return (
    <Dropdown id={props.inputId} placeholder="Select a priority" {...props}>
      {props.options.map((option) => (
        <Option key={option}>{option}</Option>
      ))}
    </Dropdown>
  );
}

export function InputTextArea(props: InputTextAreaType) {
  return <Textarea {...props} />;
}

export function InputTag(props: InputTagType) {
  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => {
    props.setSelectedOptions(data.selectedOptions);
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setInputValue(event.currentTarget.value);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && props.inputValue) {
      props.setInputValue('');
      props.setSelectedOptions((curr) =>
        curr.includes(props.inputValue) ? curr : [...curr, props.inputValue],
      );
    }
  };
  return (
    <TagPicker
      noPopover
      onOptionSelect={onOptionSelect}
      selectedOptions={props.selectedOptions}
    >
      <TagPickerControl>
        <TagPickerGroup aria-label="Selected Employees">
          {props.selectedOptions.map((option, index) => (
            <Tag key={index} value={option}>
              {option}
            </Tag>
          ))}
        </TagPickerGroup>
        <TagPickerInput
          value={props.inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-label="Add Employees"
        />
      </TagPickerControl>
    </TagPicker>
  );
}
