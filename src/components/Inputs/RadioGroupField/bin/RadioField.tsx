import React from 'react';
import { RadioInput } from './RadioInputCore';
import type { RadioInputCoreProps } from './RadioInputCore';

export interface RadioFieldProps extends RadioInputCoreProps {
  id: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  description?: string;
  onChange?: () => void;
  alignRadioButtonRight?: boolean;
}

export const RadioField = ({
  id,
  label,
  checked,
  disabled = false,
  readOnly = false,
  alignRadioButtonRight = false,
  description = '',
  onChange = () => {},
  ...htmlInputProps
}: RadioFieldProps) => {
  
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

  const [containerClassNames, labelContainerClassNames] = React.useMemo(() => {
    const containerBaseStyles = styles.container.baseStyles;
    const containerAlignmentStyles = alignRadioButtonRight ? styles.container.rowReverse : styles.container.default;

    let containerSelectedStyles = styles.container.enabled;
    if (disabled) containerSelectedStyles = checked ? styles.container.disabled.selected : styles.container.disabled.unselected;
    if (readOnly) containerSelectedStyles = checked ? styles.container.readOnly.selected : styles.container.readOnly.unselected;

    const containerStyles = [containerBaseStyles, containerAlignmentStyles, containerSelectedStyles].filter(Boolean).join(' ');
    const labelStyles = alignRadioButtonRight ? styles.labelContainer.rowReverse : styles.labelContainer.default;
  
    return [ containerStyles, labelStyles ];
  }, [alignRadioButtonRight, checked, readOnly, disabled]);

  const handleChange = () => {
    if (readOnly || disabled) return;
    onChange();
  }

  return (
    <div className={containerClassNames} onClick={handleChange}>
      <RadioInput
        id={id}
        disabled={disabled}
        readOnly={readOnly}
        checked={checked}
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
    baseStyles: 'relative flex items-center py-2.5',
    default: 'pl-2',
    rowReverse: 'relative flex items-center pr-2 py-2.5 justify-between flex-row-reverse',
    enabled: 'hover:bg-blue-50 cursor-pointer group',
    disabled: {
      selected: 'bg-gray-50',
      unselected: 'opacity-50',
    },
    readOnly: {
      selected: 'bg-indigo-50',
      unselected: 'opacity-50',
    },
  },
  labelContainer: {
    default: 'ml-3 text-sm leading-6',
    rowReverse: 'ml-2 text-sm leading-6',
  },
  label: 'font-medium text-gray-900',
  labelDescription: 'text-gray-600',
};
