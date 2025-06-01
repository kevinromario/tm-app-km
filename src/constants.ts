export type FieldType = 'text' | 'text-area' | 'date' | 'datetime-local' | 'select' | 'array' | 'email'
export type FormDataType = Record<string, string | number | boolean | string[] | Date | null>;
type FieldValue = {
  value: string | number | boolean | string[] | Date | null;
  type: string;
};

export type FilterDataType = {
  [x: string]: FieldValue;
};

export type ColumnTable = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  isRequired: boolean;
  isFilterable: boolean;
};

export type InputType = 'text' | 'number' | 'date';

export interface InputComponent {
  id: string;
  type: FieldType;
  name: string;
  label: string;
  isRequired: boolean;
  isFilterable: boolean;
  isMandatory: boolean;
  options?: string[];
  colSpan?: 1 | 2
}

export interface FormRow {
  id: string;
  columns: (InputComponent)[];
}

export interface FormStructure {
  rows: FormRow[];
}

export interface FormNColumnStructure {
  form: FormStructure;
  columnsTable: ColumnTable[]
}

export const fieldInputList = ['text', 'text-area', 'date', 'datetime-local', 'select', 'array', 'email']
export const pageSizeList = [5, 10]
export const organizationId = "7be52161-fde0-447d-b5fe-d154f9671b89"
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const MandatoryFormNColumn: FormNColumnStructure = {
  form: {
    rows: [
      {
        id: "4df3a54b-0dfa-4629-b315-ff170468ce1a",
        columns: [
          {
            id: "a9af83a1-8b3d-4516-87eb-641afd71f0f8",
            type: 'text',
            name: 'title',
            label: 'Title',
            isRequired: true,
            isFilterable: true,
            isMandatory: true,
            options: undefined,
            colSpan: 1,
          }
        ]
      },
      {
        id: "2eb80a60-3f67-4821-8844-5edf0ebf12f0",
        columns: [
          {
            id: "a0537735-93fc-45fe-97b9-b83c9c143bbc",
            type: 'select',
            name: 'status',
            label: 'Status',
            isRequired: true,
            isFilterable: true,
            isMandatory: true,
            options: ["todo", "in-progress", "completed"],
            colSpan: 1,
          }
        ]
      }
    ]
  },
  columnsTable: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      options: undefined,
      isRequired: true,
      isFilterable: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: ["todo", "in-progress", "completed"],
      isRequired: true,
      isFilterable: true,
    }
  ]
}

