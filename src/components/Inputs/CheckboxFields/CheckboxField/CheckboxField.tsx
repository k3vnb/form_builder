import React from 'react';
import { CheckboxInput } from './CheckboxInputCore';
import type { CheckboxInputCoreProps } from './CheckboxInputCore';

export interface CheckboxFieldProps extends CheckboxInputCoreProps {
  id: string;
  label: string;
  disabled?: boolean;
  readOnly?: boolean;
  checked?: boolean;
  onChange?: () => void;
  alignCheckboxRight?: boolean;
  description?: string;
}

export const CheckboxField = ({
  id,
  label,
  disabled = false,
  readOnly = false,
  alignCheckboxRight = false,
  description = '',
  onChange = () => {},
  ...htmlInputProps
}: CheckboxFieldProps) => {
  
  const ariaDescribedById = React.useMemo(() => (
    description ? `${id}-description` : undefined
  ), [id, description]);

  const ariaAttributes = React.useMemo(() => {
    const attrs: Record<string, string | boolean> = {};
    if (disabled) attrs['aria-disabled'] = true;
    if (readOnly) attrs['aria-readonly'] = true;
    if (ariaDescribedById) attrs['aria-describedby'] = ariaDescribedById;
    return attrs;
  }, [ariaDescribedById, disabled, readOnly]);

  const [containerClassNames, labelContainerClassNames] = React.useMemo(() => ([
    alignCheckboxRight ? styles.container.rowReverse : styles.container.default,
    alignCheckboxRight ? styles.labelContainer.rowReverse : styles.labelContainer.default,
  ]), [alignCheckboxRight]);


  return (
    <div className={containerClassNames}>
      <CheckboxInput
        id={id}
        disabled={disabled}
        readOnly={readOnly}
        {...ariaAttributes}
        {...htmlInputProps}
        onChange={onChange}
      />
      <div className={labelContainerClassNames}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {description && (
          <p id={ariaDescribedById} className={styles.labelDescription}>
            {description}
          </p>
        )}
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
