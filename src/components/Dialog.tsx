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
import type { FieldType, FormDataType, FormStructure } from '../constants';
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
  listForms: FormStructure;
  onSubmit: (props: FormDataType) => void;
  loading?: boolean;
  error?: string;
  initialData?: FormDataType;
};

export default function Dialog(props: DialogType) {
  const [formData, setFormData] = useState<FormDataType>({});
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (props.isOpen) {
      if (props.initialData && Object.keys(props.initialData).length > 0) {
        setFormData(props.initialData);
      } else {
        setFormData({});
      }
      setError(undefined);
    }
  }, [props.isOpen]);

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

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
      const missingFields: string[] = [];

      props.listForms.rows.forEach((row) => {
        row.columns.forEach((component) => {
          if (component.isRequired) {
            const value = formData[component.name];
            const isEmpty =
              value === undefined ||
              value === null ||
              (typeof value === 'string' && value.trim() === '') ||
              (Array.isArray(value) && value.length === 0);

            if (isEmpty) {
              missingFields.push(component.label || component.name);
            }
          }
        });
      });

      if (missingFields.length > 0) {
        const message = `Please fill in the required fields: ${missingFields.join(', ')}`;
        setError(message);
        return;
      }

      props.onSubmit(formData);
      setFormData({});
      setError(undefined);
    } catch (error) {
      console.error(error);
      setError('Something went wrong while submitting the form.');
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
              {props.listForms.rows.map((row, index) => {
                return row.columns.map((column) => {
                  if (column.type === 'email') {
                    return (
                      <InputEmail
                        key={`${column.name}-${index}`}
                        defaultValue={
                          props.initialData &&
                          (props.initialData[column.name] as string)
                        }
                        inputId={column.name}
                        required={Boolean(column.isRequired)}
                        showLabel
                        placeholder={`Input ${column.label}`}
                        handleChange={handleChange}
                        type={column.type}
                        name={column.name}
                        label={column.label}
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
                        required={Boolean(column.isRequired)}
                        showLabel
                        placeholder={`Input ${column.label}`}
                        handleChange={handleChange}
                        type={column.type}
                        name={column.name}
                        label={column.label}
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
                        required={Boolean(column.isRequired)}
                        showLabel
                        placeholder={`Input ${column.label}`}
                        handleChange={handleChange}
                        type={column.type}
                        name={column.name}
                        label={column.label}
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
                        required={Boolean(column.isRequired)}
                        showLabel
                        placeholder={`Select ${column.label}`}
                        options={column.options || []}
                        handleChange={handleChange}
                        type={column.type}
                        name={column.name}
                        label={column.label}
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
                        required={Boolean(column.isRequired)}
                        showLabel
                        placeholder={`Input ${column.label}`}
                        handleChange={handleChange}
                        type={column.type}
                        name={column.name}
                        label={column.label}
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
                        required={Boolean(column.isRequired)}
                        showLabel
                        handleChange={handleChange}
                        type={column.type}
                        name={column.name}
                        label={column.label}
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
                      required={Boolean(column.isRequired)}
                      showLabel
                      placeholder={`Input ${column.label}`}
                      handleChange={handleChange}
                      type="text"
                      name={column.name}
                      label={column.label}
                    />
                  );
                });
              })}
              {error && (
                <MessageBar
                  key={'error'}
                  intent={'error'}
                  style={{ minHeight: 'fit-content', padding: '10px' }}
                >
                  <MessageBarBody>{error}</MessageBarBody>
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
