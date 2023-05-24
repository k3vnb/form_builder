
import { InputState, InputStateStyleProps } from '../types';

interface IInputStyles<T> {
  [key: string]: T;
}

const shouldRenderDefaultStyles = (state: InputState): boolean => (
  !state.invalid && !state.readOnly && !state.disabled && !state.active && !state.selected
);

const getStyles = (styles: InputStateStyleProps, state: InputState): string => (
  [
    // base styles are always applied
    styles.baseStyles,
    // invalid styles may be applied to disabled or readOnly fields, with less priority
    (state.invalid && styles.invalid),
    // active styles may be applied to disabled or readOnly fields, with less priority
    (state.active && styles.active),
    // selected styles may be applied to disabled or readOnly fields, with less priority
    (state.selected && styles.selected),
    // readOnly takes precedence over disabled
    (state.readOnly && styles.readOnly) || (state.disabled && styles.disabled),
    // default styles are applied only if no stateful styles are applied
    (shouldRenderDefaultStyles(state) && styles.default),
  ].filter(Boolean).join(' ')
);


export const getInputStyles = (
  styles: IInputStyles<string | InputStateStyleProps>,
  state: InputState = {},
): IInputStyles<string> => {
  const keys = Object.keys(styles);
  return keys.reduce((acc, key) => {
    const value = styles[key];
    acc[key] = typeof value === 'string'
      ? value
      : getStyles(value, state);
    return acc;
  }, {} as IInputStyles<string>);
}
