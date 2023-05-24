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
  alignRadioButtonRight?: boolean;
  onChange?: () => void;
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

  const styles = React.useMemo(() => {
    const rowReverse = alignRadioButtonRight;

    return {
      ...stylesheet,
      container: getContainerStyles({ rowReverse, disabled, readOnly, checked }),
      labelContainer: getLabelContainerStyles({ rowReverse }),
    };
  }, [alignRadioButtonRight, checked, readOnly, disabled]);

  const handleChange = () => {
    if (readOnly || disabled) return;
    onChange();
  }

  return (
    <div className={styles.container} onClick={handleChange}>
      <RadioInput
        id={id}
        disabled={disabled || readOnly}
        readOnly={readOnly}
        checked={checked}
        {...ariaAttributes}
        {...htmlInputProps}
        onChange={onChange}
      />
      <div className={styles.labelContainer}>
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

const getContainerStyles = ({ rowReverse, disabled, readOnly, checked = false }: Record<string, boolean | undefined>) => {
  const { container } = stylesheet;
  const alignmentStyles = rowReverse ? container.rowReverse : container.default;

  let selectedStyles = container.enabled;
  if (disabled) selectedStyles = checked ? container.disabled.selected : container.disabled.unselected;
  if (readOnly) selectedStyles = checked ? container.readOnly.selected : container.readOnly.unselected;

  return [container.baseStyles, alignmentStyles, selectedStyles].filter(Boolean).join(' ');
}

const getLabelContainerStyles = ({ rowReverse }: Record<string, boolean>) => (
  rowReverse ? stylesheet.labelContainer.rowReverse : stylesheet.labelContainer.default
);

const stylesheet = {
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
