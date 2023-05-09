import React from 'react';

export interface CheckboxInputCoreProps extends React.InputHTMLAttributes<HTMLInputElement> {}
  
export const CheckboxInput = (props: CheckboxInputCoreProps) => {
  const { disabled = false, readOnly = false } = props;

  const inputClassNames = React.useMemo(() => (
    [
      styles.input.baseStyles,
      (readOnly && styles.input.readOnly) || (disabled && styles.input.disabled) || '',
    ].filter(Boolean).join(' ')
  ), [readOnly, disabled]);

  return (
    <div className={styles.container}>
      <input
        {...props}
        type="checkbox"
        disabled={disabled || readOnly}
        readOnly={readOnly}
        className={inputClassNames}
      />
    </div>
  );
}

const styles = {
  container: 'flex h-6 items-center',
  input: {
    baseStyles: 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600',
    disabled: 'disabled:cursor-not-allowed disabled:border-transparent disabled:text-gray-400 disabled:bg-gray-200',
    readOnly: 'cursor-not-allowed text-purple-600 bg-indigo-200',
  },
};