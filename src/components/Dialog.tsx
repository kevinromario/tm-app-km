import {
  Dialog as DialogContainer,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Spinner,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import {
  useEffect,
  useState,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from 'react';
import type { ColumnType, FieldType, FormDataType } from '../constants';
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
  onSubmit: (props: FormDataType) => void;
  loading?: boolean;
  error?: string;
  initialData?: FormDataType;
};

export default function Dialog(props: DialogType) {
  const [formData, setFormData] = useState<FormDataType>({});

  useEffect(() => {
    if (props.initialData) {
      setFormData(props.initialData);
    }
  }, [props.initialData]);

  useEffect(() => {
    setFormData({});
  }, [props.isOpen]);

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
  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      props.onSubmit(formData);
      setFormData({});
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      //
    }
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
              {props.listColumns.map((column, index) => {
                if (column.type === 'email') {
                  return (
                    <InputEmail
                      key={`${column.name}-${index}`}
                      defaultValue={
                        props.initialData &&
                        (props.initialData[column.name] as string)
                      }
                      inputId={column.name}
                      required={Boolean(column.required)}
                      showLabel
                      placeholder={`Input ${column.label}`}
                      handleChange={handleChange}
                      type={column.type}
                    />
                  );
                }
                if (column.type === 'date') {
                  return (
                    <InputDate
                      key={`${column.name}-${index}`}
                      defaultValue={
                        props.initialData &&
                        (props.initialData[column.name] as string)
                      }
                      inputId={column.name}
                      required={Boolean(column.required)}
                      showLabel
                      placeholder={`Input ${column.label}`}
                      handleChange={handleChange}
                      type={column.type}
                    />
                  );
                }
                if (column.type === 'datetime-local') {
                  return (
                    <InputDateTime
                      key={`${column.name}-${index}`}
                      defaultValue={
                        props.initialData &&
                        (props.initialData[column.name] as string)
                      }
                      inputId={column.name}
                      required={Boolean(column.required)}
                      showLabel
                      placeholder={`Input ${column.label}`}
                      handleChange={handleChange}
                      type={column.type}
                    />
                  );
                }
                if (column.type === 'select') {
                  return (
                    <InputSelect
                      key={`${column.name}-${index}`}
                      defaultValue={
                        props.initialData &&
                        (props.initialData[column.name] as string)
                      }
                      inputId={column.name}
                      required={Boolean(column.required)}
                      showLabel
                      placeholder={`Select ${column.label}`}
                      options={column.options || []}
                      handleChange={handleChange}
                      type={column.type}
                    />
                  );
                }
                if (column.type === 'text-area') {
                  return (
                    <InputTextArea
                      key={`${column.name}-${index}`}
                      defaultValue={
                        props.initialData &&
                        (props.initialData[column.name] as string)
                      }
                      inputId={column.name}
                      required={Boolean(column.required)}
                      showLabel
                      placeholder={`Input ${column.label}`}
                      handleChange={handleChange}
                      type={column.type}
                    />
                  );
                }
                if (column.type === 'array') {
                  return (
                    <InputTag
                      key={`${column.name}-${index}`}
                      defaultValue={
                        props.initialData &&
                        (props.initialData[column.name] as string[])
                      }
                      inputId={column.name}
                      required={Boolean(column.required)}
                      showLabel
                      handleChange={handleChange}
                      type={column.type}
                    />
                  );
                }

                return (
                  <InputText
                    key={`${column.name}-${index}`}
                    defaultValue={
                      props.initialData &&
                      (props.initialData[column.name] as string)
                    }
                    inputId={column.name}
                    required={Boolean(column.required)}
                    showLabel
                    placeholder={`Input ${column.label}`}
                    handleChange={handleChange}
                    type="text"
                  />
                );
              })}
              {props.error && (
                <MessageBar
                  key={'error'}
                  intent={'error'}
                  style={{ minHeight: 'fit-content', padding: '10px' }}
                >
                  <MessageBarBody>{props.error}</MessageBarBody>
                </MessageBar>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                appearance="primary"
                disabled={props.loading}
                isLoading={true}
                icon={props.loading ? <Spinner size="tiny" /> : null}
              >
                {props.loading ? 'Loading' : 'Submit'}
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
