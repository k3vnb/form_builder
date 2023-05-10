import React from 'react';

export interface RadioInputCoreProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: () => void;
}
  
export const RadioInput = (props: RadioInputCoreProps) => {
  const {
    disabled = false,
    readOnly = false,
    onChange = () => {},
  } = props;

  const inputClassNames = React.useMemo(() => (
    [
      styles.input.baseStyles,
      (readOnly && styles.input.readOnly) || (disabled && styles.input.disabled) || styles.input.default,
    ].filter(Boolean).join(' ')
  ), [readOnly, disabled]);

  return (
    <div className={styles.container}>
      <input
        {...props}
        type="radio"
        disabled={disabled || readOnly}
        readOnly={readOnly}
        className={inputClassNames}
        onChange={onChange}
      />
    </div>
  );
}

const styles = {
  container: 'flex h-6 items-center',
  input: {
    baseStyles: 'h-4 w-4 border-gray-300 ring-1 ring-transparent focus:ring-indigo-600 group-hover:ring-indigo-200 cursor-pointer disabled:cursor-not-allowed',
    default: 'text-indigo-600',
    disabled: 'disabled:cursor-not-allowed disabled:border-transparent text-gray-400 bg-gray-200',
    readOnly: 'cursor-not-allowed text-purple-600 bg-indigo-200',
  },
};