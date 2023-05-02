import React from 'react';
import { Label } from '../Label';
import { InputHelperText } from './bin';
import { getAriaDescribedById, getTextInputAriaAttributes } from './bin/util';

type HTMLInputProps = Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>;

export interface TextInputProps extends HTMLInputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  label?: string;
  touched?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  hideLabel?: boolean;
  errorText?: string;
  helperText?: string;
  onChange?: (value: string) => void | undefined;
  onBlur?: () => void | undefined;
}


export const TextInput = ({
  type = 'text',
  value = '',
  label = '',
  touched = false,
  helperText = '',
  errorText = '',
  hideLabel = false,
  invalid = false,
  onChange = () => {},
  onBlur = () => {},
  required = false,
  disabled = false,
  readOnly = false,
  ...htmlInputProps
}: TextInputProps): JSX.Element => {

  const classNames: string = React.useMemo(() => getInputClassNames(invalid, readOnly), [invalid, readOnly]);
  const id = htmlInputProps.id ?? label;

  const showInvalid: boolean = React.useMemo(() => (touched && invalid), [touched, invalid]);
  const showHelperText: boolean = React.useMemo(() => (showInvalid || !!helperText), [showInvalid, helperText]);

  const ariaDescribedById = React.useMemo(() => (
    getAriaDescribedById({ id, isInvalid: showInvalid, show: showHelperText })
  ), [id, showInvalid, showHelperText]);

  const ariaAttributes = React.useMemo(() => (
    getTextInputAriaAttributes({ ariaDescribedById, isInvalid: showInvalid })
  ), [ariaDescribedById, showInvalid]);

  return (
    <div>
      <Label htmlFor={id} text={label} srOnly={hideLabel} required={required} />
      <div className="mt-2">
        <input
          id={id}
          type={type}
          required={required}
          className={classNames}
          value={value ?? ''}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          {...ariaAttributes}
          {...htmlInputProps}
        />
      </div>
      <InputHelperText
        id={ariaDescribedById}
        show={showHelperText}
        isInvalid={showInvalid}
        text={errorText || helperText}
      />
    </div>
  )
}

const getInputClassNames = (invalid: boolean, readOnly: boolean) => {
  const baseStyles = styles.baseStyles;

  if (readOnly) return `${baseStyles} ${styles.readOnly}`;
  if (invalid) return `${baseStyles} ${styles.invalid}`;
  return `${baseStyles} ${styles.default}`;
}

const styles = {
  baseStyles: 'block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
  default: 'text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600',
  invalid: 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
  readOnly: 'bg-gray-50 text-gray-500 ring-gray-300 cursor-not-allowed',
}

