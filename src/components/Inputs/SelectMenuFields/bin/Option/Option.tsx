import React from 'react';
import { Listbox } from '@headlessui/react';
import { OptionCheckIcon } from './OptionCheckIcon';

export interface OptionType {
  id: string;
  display: string;
  description?: string;
}

interface OptionProps {
  value: OptionType;
}

export const Option = ({ value }: OptionProps) => {

  const getContainerClassNames = (active: boolean) => (
    `${styles.container.baseStyles} ${active ? styles.container.active : styles.container.default}`
  );

  const getDisplayClassNames = (selected: boolean) => (
    `${styles.display.baseStyles} ${selected ? styles.display.selected : styles.display.default}`
  );

  return (
    <Listbox.Option
      className={({ active }) => getContainerClassNames(active)}
      value={value}
    >
      {({ selected, active }) => (
        <>
          <span className={getDisplayClassNames(selected)}>
            {value.display}
          </span>
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
  },
  display: {
    baseStyles: 'block truncate',
    selected: 'font-semibold',
    default: 'font-normal',
  },
};
