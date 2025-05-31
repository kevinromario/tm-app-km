export type FieldType = 'text' | 'text-area' | 'date' | 'date-time' | 'select' | 'array' | 'email'
export type FormDataType = Record<string, string | number | boolean | string[] | null>;
export type ColumnType = {
  name: string;
  label: string;
  type: FieldType;
  options?: Array<string>;
  required?: boolean;
  filterable?: boolean;
};

export const pageSizeList = [5, 10]