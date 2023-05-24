export type InputState = {
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

export type InputStateStyleProps = {
  baseStyles?: string;
  default?: string;
  invalid?: string;
  disabled?: string;
  readOnly?: string;
}

export type InputStateStyleObject = Record<string, InputStateStyleProps>;
