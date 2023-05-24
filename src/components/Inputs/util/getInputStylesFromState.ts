
import { InputState, InputStateStyleProps, InputStateStyleObject } from '../types';

type TInputStateStyleKey = keyof InputStateStyleObject;
type TR = Record<string, string>;

export const getStyles = (styles: InputStateStyleProps, state: InputState): string => (
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

export const getInputStylesFromState = (styles: InputStateStyleObject, state: InputState): TR => {
  const keys = Object.keys(styles) as TInputStateStyleKey[];
  return keys.reduce((acc, key) => {
    acc[key] = getStyles(styles[key], state);
    return acc;
  }, {} as TR);
};
