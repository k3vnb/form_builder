import React from 'react';
import { Label } from '../../Label';
import { InputHelperText } from '../bin';
import { getAriaDescribedById, getTextInputAriaAttributes } from './bin/util';
import { TextInput, TextInputCoreProps } from './bin';

export interface TextInputFieldProps extends TextInputCoreProps {
  value?: string;
  label: string;
  readOnly?: boolean;
  required?: boolean;
  inlineLabel?: boolean;
  hideLabel?: boolean;
  errorText?: string;
  helperText?: string;
}

export const TextInputField = (props: TextInputFieldProps): JSX.Element => {
  const {
    label,
    type = 'text',
    value = '',
    touched = false,
    invalid = false,
    disabled = false,
    required = false,
    readOnly = false,
    helperText = '',
    errorText = '',
    hideLabel = false,
    inlineLabel = false,
    onBlur = () => {},
    onFocus = () => {},
    onChange = () => {},
    ...htmlInputProps
  } = props;

  const id = htmlInputProps.id ?? label;
  const showInvalid: boolean = React.useMemo(() => (touched && invalid), [touched, invalid]);
  const showHelperText: boolean = React.useMemo(() => (showInvalid || !!helperText), [showInvalid, helperText]);

  const containerClassNames = React.useMemo(() => (
    inlineLabel ? styles.container.inlineLabel : styles.container.default
  ), [inlineLabel]);

  const ariaDescribedById = React.useMemo(() => (
    getAriaDescribedById({ id, isInvalid: showInvalid, show: showHelperText })
  ), [id, showInvalid, showHelperText]);

  const ariaAttributes = React.useMemo(() => (
    getTextInputAriaAttributes({ ariaDescribedById, isInvalid: showInvalid })
  ), [ariaDescribedById, showInvalid]);

  return (
    <div className={containerClassNames}>
      <Label
        text={label}
        inline={inlineLabel}
        htmlFor={id}
        srOnly={hideLabel}
        required={required}
      />
      <div className={styles.container.default}>
        <TextInput
          id={id}
          type={type}
          invalid={showInvalid}
          required={required}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          readOnly={readOnly}
          {...ariaAttributes}
          {...htmlInputProps}
        />
        <InputHelperText
          id={ariaDescribedById}
          show={showHelperText}
          isInvalid={showInvalid}
          text={errorText || helperText}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    default: 'flex flex-col gap-2',
    inlineLabel: 'flex items-baseline gap-x-2.5',
  },
}

