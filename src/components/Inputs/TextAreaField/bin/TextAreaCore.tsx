import React from 'react';
import { getInputStyles } from '../../util';

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
  ...htmlTextAreaProps
}: TextAreaCoreProps): JSX.Element => {

  const styles = React.useMemo(() => (
    getInputStyles(stylesheet, { invalid, disabled, readOnly })
  ), [invalid, disabled, readOnly]);

  return (
    <div className={styles.textAreaContainer}>
      <textarea
        className={styles.textAreaEl}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        readOnly={readOnly}
        {...htmlTextAreaProps}
      />
    </div>
  );
};

const stylesheet = {
  textAreaContainer: 'relative rounded-md',
  textAreaEl: {
    baseStyles: 'block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
    default: 'text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600',
    invalid: 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500',
    readOnly: 'bg-indigo-50 text-gray-600 placeholder:text-gray-500 placeholder:font-normal ring-gray-300 cursor-not-allowed tracking-wide',
    disabled: 'bg-gray-50 text-gray-500 placeholder:text-gray-400 ring-gray-200 cursor-not-allowed'
  },
};
