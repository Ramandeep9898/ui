export interface Field {
  name: string;
  label: string;
  inputType?: string;
  element: string;
  required?: boolean;
  options?: { name: string; value: string }[];
}

export interface FormData {
  [key: string]: string;
}
