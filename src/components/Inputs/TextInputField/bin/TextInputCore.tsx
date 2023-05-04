import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

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

  const classNames: string = React.useMemo(() => getInputClassNames(invalid, readOnly, disabled), [invalid, readOnly, disabled]);

  return (
    <div className="relative rounded-md">
      <input
        className={classNames}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        {...htmlInputProps}
      />
      {invalid && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

const getInputClassNames = (showInvalid: boolean, readOnly: boolean, disabled: boolean) => {
  const baseStyles = styles.baseStyles;

  if (readOnly) return `${baseStyles} ${styles.readOnly}`;
  if (disabled) return `${baseStyles} ${styles.disabled}`;
  if (showInvalid) return `${baseStyles} ${styles.invalid}`;
  return `${baseStyles} ${styles.default}`;
}

const styles = {
  baseStyles: 'block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
  default: 'text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600',
  invalid: 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
  readOnly: 'bg-gray-50 text-gray-500 ring-gray-300 cursor-not-allowed',
  disabled: 'bg-gray-50 text-gray-500 ring-gray-300 cursor-not-allowed cursor-not-allowed opacity-50'
}

