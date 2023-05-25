import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { getInputStyles } from '../../util';

type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export interface TextInputCoreProps extends HTMLInputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  touched?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  onChange: (value: string) => void | undefined;
}

export const TextInput = ({
  value = '',
  touched = false,
  invalid = false,
  disabled = false,
  readOnly = false,
  onChange = () => {},
  ...htmlInputProps
}: TextInputCoreProps): JSX.Element => {

  const styles = React.useMemo(() => (
    getInputStyles(stylesheet, { invalid, disabled, readOnly })
  ), [invalid, disabled, readOnly]);

  const showInvalidIcon = React.useMemo(() => (!disabled && invalid), [disabled, invalid]);

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.inputEl}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        {...htmlInputProps}
      />
      {showInvalidIcon && (
        <div className={styles.invalidIconContainer}>
          <ExclamationCircleIcon className={styles.invalidIcon} aria-hidden="true" />
        </div>
      )}
    </div>
  );
};

const stylesheet = {
  inputContainer: 'relative rounded-md',
  invalidIconContainer: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3',
  invalidIcon: 'h-5 w-5 text-red-500',
  inputEl: {
    baseStyles: 'block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
    default: 'text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600',
    disabled: 'bg-gray-50 text-gray-500 placeholder:text-gray-400 ring-gray-200 cursor-not-allowed',
    invalid: 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
    readOnly: 'bg-indigo-50 text-gray-600 placeholder:text-gray-500 placeholder:font-normal ring-gray-300 cursor-not-allowed tracking-wide',
  },
}
