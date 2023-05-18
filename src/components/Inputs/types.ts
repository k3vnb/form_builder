export type InputFieldStyleType = {
  baseStyles?: string;
  default?: string;
  invalid?: string;
  disabled?: string;
  readOnly?: string;
}

export type InputFieldStateType = {
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

export type InputFieldStyleInterface = Record<string, InputFieldStyleType>;
