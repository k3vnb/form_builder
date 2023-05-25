import React from 'react';
import { Label } from '../../Label';
import { InputHelperText, InputFieldLayout } from '../bin';
import { TextInput, TextInputCoreProps } from './bin';
import { getAriaDescribedById, getInputAriaAttributes } from '../bin/util';
import { formatIdFromString } from '../../../util';

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

  const id = React.useMemo(() => htmlInputProps.id ?? formatIdFromString(label), [htmlInputProps.id, label]);
  const showInvalid: boolean = React.useMemo(() => (touched && invalid), [touched, invalid]);
  const showHelperText: boolean = React.useMemo(() => (showInvalid || !!helperText), [showInvalid, helperText]);

  const ariaDescribedById = React.useMemo(() => (
    getAriaDescribedById({ id, isInvalid: showInvalid, show: showHelperText })
  ), [id, showInvalid, showHelperText]);

  const ariaAttributes = React.useMemo(() => (
    getInputAriaAttributes({ ariaDescribedById, isInvalid: showInvalid })
  ), [ariaDescribedById, showInvalid]);

  return (
    <InputFieldLayout.MainContainer inlineLabel={inlineLabel}>
      <InputFieldLayout.LabelContainer inlineLabel={inlineLabel} hideLabel={hideLabel}>
        <Label
          text={label}
          inline={inlineLabel}
          htmlFor={id}
          srOnly={hideLabel}
          required={required}
        />
      </InputFieldLayout.LabelContainer>
      <InputFieldLayout.InputContainer inlineLabel={inlineLabel} hideLabel={hideLabel}>
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
      </InputFieldLayout.InputContainer>
    </InputFieldLayout.MainContainer>
  );
};
