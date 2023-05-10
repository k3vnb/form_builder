import React from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Options, OptionType } from '.';
import { Nullable } from '../../../../var/types';

export interface ListBoxSelectProps {
  open: boolean;
  selected: Nullable<OptionType>;
  placeholder?: string;
  options: OptionType[];
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
}

export const ListBoxSelect = ({
  open,
  selected,
  placeholder = 'Select an option',
  options = [],
}: ListBoxSelectProps) => {
  const displayText = selected?.display || placeholder;
  const displayClassNames = selected ? styles.display : styles.placeholder;

  return (
    <div className="relative">
      <Listbox.Button className={styles.buttonContainer}>
        <span className={displayClassNames}>{displayText}</span>
        <span className={styles.iconContainer}>
          <ChevronUpDownIcon className={styles.icon} aria-hidden="true" />
        </span>
      </Listbox.Button>
      <Options open={open} options={options} />
    </div>
  )
}

const styles = {
  buttonContainer: 'relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6',
  display: 'block truncate',
  placeholder: 'block truncate text-gray-500',
  iconContainer: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2',
  icon: 'h-5 w-5 text-gray-400',
};
