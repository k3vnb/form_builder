import React from 'react';
import { getInputStyles } from '../../util';

export interface CheckboxInputCoreProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange?: () => void;
}

export const CheckboxInput = (props: CheckboxInputCoreProps) => {
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
        type="checkbox"
        disabled={disabled || readOnly}
        readOnly={readOnly}
        className={styles.inputEl}
        onChange={onChange}
      />
    </div>
  );
};

const stylesheet = {
  container: 'flex h-6 items-center',
  inputEl: {
    baseStyles: 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600',
    disabled: 'disabled:cursor-not-allowed disabled:border-transparent disabled:text-gray-400 disabled:bg-gray-200',
    readOnly: 'cursor-not-allowed text-purple-600 bg-indigo-200',
  },
};
