export type FieldType = 'text' | 'text-area' | 'date' | 'datetime-local' | 'select' | 'array' | 'email'
export type FormDataType = Record<string, string | number | boolean | string[] | Date | null>;
type FieldValue = {
  value: string | number | boolean | string[] | Date | null;
  type: string;
};

export type FilterDataType = {
  [x: string]: FieldValue;
};
export type ColumnType = {
  name: string;
  label: string;
  type: FieldType;
  options?: Array<string>;
  required?: boolean;
  filterable?: boolean;
};

export const pageSizeList = [5, 10]
export const organizationId = "7be52161-fde0-447d-b5fe-d154f9671b89"
export const backendUrl = "http://localhost:7071/api"
// export const backendUrl = "https://tm-app-km.azurewebsites.net/api"