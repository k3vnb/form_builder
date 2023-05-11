import React from 'react';
import { Listbox } from '@headlessui/react';
import { OptionCheckIcon } from './OptionCheckIcon';

export interface OptionType {
  id: string;
  display: string;
  description?: string;
  disabled?: boolean;
}

interface OptionProps {
  value: OptionType;
}

export const Option = ({ value }: OptionProps) => {

  const getContainerClassNames = (active: boolean) => (
    [
      styles.container.baseStyles,
      active ? styles.container.active : styles.container.default,
      value.disabled ? styles.container.disabled : '',
    ].filter(Boolean).join(' ')
  );

  const getDisplayClassNames = (selected: boolean) => (
    `${styles.display.baseStyles} ${selected ? styles.display.selected : styles.display.default}`
  );

  const getDescriptionClassNames = (active: boolean, selected: boolean) => (
    [
      styles.description.baseStyles,
      active ? styles.description.active : styles.description.default,
      selected && styles.description.selected,
    ].filter(Boolean).join(' ')
  );

  return (
    <Listbox.Option
      disabled={value.disabled}
      className={({ active }) => getContainerClassNames(active)}
      value={value}
    >
      {({ selected, active }) => (
        <>
          <span className={getDisplayClassNames(selected)}>
            {value.display}
          </span>
          {value.description && (
            <span className={getDescriptionClassNames(active, selected)}>
              {value.description}
            </span>
          )}
          <OptionCheckIcon selected={selected} active={active} />
        </>
      )}
    </Listbox.Option>
  )
}

const styles = {
  container: {
    baseStyles: 'relative cursor-default select-none py-2 pl-8 pr-4',
    active: 'bg-indigo-600 text-white',
    default: 'text-gray-900',
    disabled: 'cursor-not-allowed opacity-50',
  },
  display: {
    baseStyles: 'block truncate',
    selected: 'font-semibold',
    default: 'font-normal',
  },
  description: {
    baseStyles: 'block text-sm tracking-wide mt-px',
    default: 'text-gray-600',
    selected: 'font-semibold',
    active: 'text-gray-100',
  },
};
