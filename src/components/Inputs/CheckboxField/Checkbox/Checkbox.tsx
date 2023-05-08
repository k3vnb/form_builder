import React from 'react';
import { CheckboxInput } from './CheckboxCoreInput';
import type { CheckboxInputCoreProps } from './CheckboxCoreInput';

export interface CheckboxProps extends CheckboxInputCoreProps {
  label: string;
  description?: string;
}

export const Checkbox = ({
  label,
  description = '',
  ...htmlInputProps
}: CheckboxProps) => {
  const id = htmlInputProps.id ?? label;

  const ariaDescribedById = React.useMemo(() => (
    description ? `${id}-description` : undefined
  ), [id, description]);

  const ariaAttributes = React.useMemo(() => (
    ariaDescribedById ? { 'aria-describedby': ariaDescribedById } : {}
  ), [ariaDescribedById]);

  return (
    <div className={styles.container}>
      <CheckboxInput
        id={id}
        {...ariaAttributes}
        {...htmlInputProps}
      />
      <div className={styles.labelContainer}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <p id={ariaDescribedById} className={styles.labelDescription}>
          {description}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: 'relative flex items-start',
  labelContainer: 'ml-3 text-sm leading-6',
  label: 'font-medium text-gray-900',
  labelDescription: 'text-gray-500',
};
