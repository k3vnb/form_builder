import React from 'react';

type HTMLTextAreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>;

export interface TextAreaCoreProps extends HTMLTextAreaProps {
  value?: string;
  touched?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  onChange: (value: string) => void | undefined;
}

export const TextArea = ({
  value = '',
  touched = false,
  invalid = false,
  disabled = false,
  readOnly = false,
  onChange = () => {},
  ...htmlAreaProps
}: TextAreaCoreProps): JSX.Element => {

  const classNames: string = React.useMemo(() => getTextAreaClassNames(invalid, readOnly, disabled), [invalid, readOnly, disabled]);

  return (
    <div className="relative rounded-md">
      <textarea
        className={classNames}
        value={value ?? ''}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        {...htmlAreaProps}
      />
    </div>
  );
}

const getTextAreaClassNames = (showInvalid: boolean, readOnly: boolean, disabled: boolean) => {
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
  readOnly: 'bg-indigo-50 text-gray-600 placeholder:text-gray-500 placeholder:font-normal ring-gray-300 cursor-not-allowed tracking-wide',
  disabled: 'bg-gray-50 text-gray-500 placeholder:text-gray-400 ring-gray-400 cursor-not-allowed cursor-not-allowed opacity-50'
}

