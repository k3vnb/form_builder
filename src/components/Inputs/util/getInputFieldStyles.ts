
import { InputFieldStyleInterface, InputFieldStateType, InputFieldStyleType } from '../types';

type InputFieldStyleKeys = keyof InputFieldStyleInterface;
type InputFieldStyleReturnType = Record<InputFieldStyleKeys, string>;

export const getStyles = (styles: InputFieldStyleType, state: InputFieldStateType): string => (
  [
    // base styles are always applied
    styles.baseStyles,
    // invalid styles may be applied to disabled or readOnly fields, with less priority
    (state.invalid && styles.invalid),
    // readOnly takes precedence over disabled
    (state.readOnly && styles.readOnly) || (state.disabled && styles.disabled),
    // default styles are applied to enabled, non-invalid, non-readOnly, non-disabled fields
    !state.invalid && !state.readOnly && !state.disabled && styles.default,
  ].filter(Boolean).join(' ')
);

export const getInputFieldStyles = (styles: InputFieldStyleInterface, state: InputFieldStateType): InputFieldStyleReturnType => {
  const keys = Object.keys(styles) as InputFieldStyleKeys[];
  return keys.reduce((acc, key) => {
    acc[key] = getStyles(styles[key], state);
    return acc;
  }, {} as InputFieldStyleReturnType);
};
