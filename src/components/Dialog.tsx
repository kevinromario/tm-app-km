import {
  Dialog as DialogContainer,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
} from '@fluentui/react-components';
import {
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from 'react';
import type { ColumnType, FormDataType } from '../constants';
import {
  InputDate,
  InputDateTime,
  InputEmail,
  InputSelect,
  InputTag,
  InputText,
  InputTextArea,
} from './Input';

type DialogType = {
  btnText: string;
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  listColumns: ColumnType[];
};

export default function Dialog(props: DialogType) {
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
    <DialogContainer open={props.isOpen}>
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="primary" onClick={() => props.setIsOpen(true)}>
          {props.btnText}
        </Button>
      </DialogTrigger>
      <DialogSurface aria-describedby={undefined}>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
              }}
            >
              {props.listColumns.map((column) => {
                if (column.type === 'email') {
                  return (
                    <InputEmail
                      inputId={column.name}
                      required={Boolean(column.required)}
                      showLabel
                      placeholder={`Input ${column.label}`}
                      handleChange={handleChange}
                    />
                  );
                }
                if (column.type === 'date') {
                  return (
                    <InputDate
                      inputId={column.name}
                      required={Boolean(column.required)}
                      showLabel
                      placeholder={`Input ${column.label}`}
                      handleChange={handleChange}
                    />
                  );
                }
                if (column.type === 'date-time') {
                  return (
                    <InputDateTime
                      inputId={column.name}
                      type="datetime-local"
                      required={Boolean(column.required)}
                      showLabel
                      placeholder={`Input ${column.label}`}
                      handleChange={handleChange}
                    />
                  );
                }
                if (column.type === 'select') {
                  return (
                    <InputSelect
                      inputId={column.name}
                      required={Boolean(column.required)}
                      showLabel
                      placeholder={`Select ${column.label}`}
                      options={column.options || []}
                      handleChange={handleChange}
                    />
                  );
                }
                if (column.type === 'text-area') {
                  return (
                    <InputTextArea
                      inputId={column.name}
                      required={Boolean(column.required)}
                      showLabel
                      placeholder={`Input ${column.label}`}
                      handleChange={handleChange}
                    />
                  );
                }
                if (column.type === 'array') {
                  return (
                    <InputTag
                      inputId={column.name}
                      required={Boolean(column.required)}
                      showLabel
                      handleChange={handleChange}
                    />
                  );
                }

                return (
                  <InputText
                    inputId={column.name}
                    required={Boolean(column.required)}
                    showLabel
                    placeholder={`Input ${column.label}`}
                    handleChange={handleChange}
                  />
                );
              })}
            </DialogContent>
            <DialogActions>
              <Button type="submit" appearance="primary">
                Submit
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button
                  appearance="secondary"
                  onClick={() => props.setIsOpen(false)}
                >
                  Close
                </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </DialogContainer>
  );
}
