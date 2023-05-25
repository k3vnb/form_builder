import React from 'react';
import { getInputStyles } from '../../util';

export interface RadioInputCoreProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: () => void;
}
  
export const RadioInput = (props: RadioInputCoreProps) => {
  const {
    disabled = false,
    readOnly = false,
    onChange = () => {},
  } = props;

  const styles = React.useMemo(() => (
    getInputStyles(stylesheet, { disabled, readOnly })
  ), [readOnly, disabled]);

  return (
    <div className={styles.container}>
      <input
        {...props}
        type="radio"
        disabled={disabled || readOnly}
        readOnly={readOnly}
        className={styles.inputEl}
        onChange={onChange}
      />
    </div>
  );
}

const stylesheet = {
  container: 'flex h-6 items-center',
  inputEl: {
    baseStyles: 'h-4 w-4 border-gray-300 ring-1 ring-transparent focus:ring-indigo-600',
    default: 'cursor-pointer text-indigo-600 group-hover:ring-indigo-200',
    disabled: 'cursor-not-allowed disabled:border-transparent text-gray-400 bg-gray-200',
    readOnly: 'cursor-not-allowed text-purple-600 bg-indigo-200',
  },
}
