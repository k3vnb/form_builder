import React from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

import { Options, OptionType } from '.';

import { getInputStyles } from '../../util';
import { Nullable } from '../../../../var/types';

export interface ListBoxSelectProps {
  open: boolean;
  placeholder?: string;
  options: OptionType[];
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value: Nullable<OptionType>;
}

export const ListBoxSelect = ({
  open,
  value,
  invalid = false,
  disabled = false,
  readOnly = false,
  placeholder = 'Select an option',
  options = [],
}: ListBoxSelectProps) => {

  const styles = React.useMemo(() => (
    getInputStyles(stylesheet, { invalid, disabled, readOnly })
  ), [invalid, disabled, readOnly]);

  const displayStyles = React.useMemo(() => (
    value ? styles.display : styles.placeholder
  ), [value, styles]);

  return (
    <div className="relative">
      <Listbox.Button className={styles.buttonContainer}>
        <span className={displayStyles}>
          {value?.display || placeholder}
        </span>
        {!readOnly && (
          <span className={styles.iconContainer}>
            <ChevronUpDownIcon className={styles.icon} aria-hidden="true" />
          </span>
        )}
      </Listbox.Button>
      <Options open={open} options={options} />
    </div>
  );
};

const stylesheet = {
  buttonContainer: {
    baseStyles: 'relative w-full rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 sm:text-sm sm:leading-6',
    default: 'cursor-default bg-white text-gray-900 ring-gray-300 focus:ring-indigo-600',
    invalid: 'cursor-default text-red-900 ring-red-300 focus:ring-red-500',
    disabled: 'cursor-not-allowed bg-gray-50 ring-gray-300 text-gray-400',
    readOnly: 'cursor-not-allowed bg-indigo-50 ring-gray-300 text-gray-600',
  },
  display: {
    baseStyles: 'block truncate',
    readOnly: 'tracking-wide'
  },
  placeholder: {
    baseStyles: 'block truncate',
    default: 'text-gray-400',
    invalid: 'text-red-300',
  },
  icon: {
    baseStyles: 'h-5 w-5',
    default: 'text-gray-400',
    disabled: 'text-gray-300',
    invalid: 'text-red-300',
  },
  iconContainer: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2',
};
