import React from 'react';
import { CheckboxInput } from './CheckboxCoreInput';
import type { CheckboxInputCoreProps } from './CheckboxCoreInput';
import { formatIdFromString } from '../../../../util';

export interface CheckboxProps extends CheckboxInputCoreProps {
  label: string;
  alignCheckboxRight?: boolean;
  description?: string;
}

export const Checkbox = ({
  label,
  alignCheckboxRight = false,
  description = '',
  ...htmlInputProps
}: CheckboxProps) => {
  const id = React.useMemo(() => htmlInputProps.id ?? formatIdFromString(label), [htmlInputProps.id, label]);

  const ariaDescribedById = React.useMemo(() => (
    description ? `${id}-description` : undefined
  ), [id, description]);

  const ariaAttributes = React.useMemo(() => (
    ariaDescribedById ? { 'aria-describedby': ariaDescribedById } : {}
  ), [ariaDescribedById]);

  const [containerClassNames, labelContainerClassNames] = React.useMemo(() => ([
    alignCheckboxRight ? styles.container.rowReverse : styles.container.default,
    alignCheckboxRight ? styles.labelContainer.rowReverse : styles.labelContainer.default,
  ]), [alignCheckboxRight]);


  return (
    <div className={containerClassNames}>
      <CheckboxInput
        id={id}
        {...ariaAttributes}
        {...htmlInputProps}
      />
      <div className={labelContainerClassNames}>
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
  container: {
    default: 'relative flex items-start py-2.5',
    rowReverse: 'relative flex items-start py-2.5 justify-between flex-row-reverse',
  },
  labelContainer: {
    default: 'ml-3 text-sm leading-6',
    rowReverse: 'ml-2 text-sm leading-6',
  },
  label: 'font-medium text-gray-900',
  labelDescription: 'text-gray-600',
};
