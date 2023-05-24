import React from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

import { Options, OptionType } from '.';

import { getInputStyles } from '../../util';
import { Nullable } from '../../../../var/types';

export interface ComboBoxSelectProps {
  open: boolean;
  placeholder?: string;
  options: OptionType[];
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  value: Nullable<OptionType>;
  onQueryChange: (query: string) => void;
}

export const ComboBoxInput = ({
  open,
  value,
  invalid = false,
  disabled = false,
  readOnly = false,
  placeholder = 'Type to search or select',
  options = [],
  onQueryChange,
}: ComboBoxSelectProps) => {
  const displayText: string = value?.display || '';

  const styles = React.useMemo(() => (
    getInputStyles(stylesheet, { invalid, disabled, readOnly })
  ), [invalid, disabled, readOnly]);

  return (
    <div className="relative">
      <Combobox.Input
        placeholder={placeholder}
        className={styles.inputContainer}
        onChange={(event) => onQueryChange(event.target.value)}
        displayValue={() => displayText}
      />
      <Combobox.Button className={styles.buttonContainer}>
        <ChevronUpDownIcon className={styles.icon} aria-hidden="true" />
      </Combobox.Button>
      <Options open={open} options={options} />
    </div>
  );
}

const stylesheet = {
  inputContainer: {
    baseStyles: 'w-full block truncate rounded-md border-0 py-1.5 pl-3 pr-10 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
    default: 'bg-white text-gray-900 focus:ring-indigo-600 ring-gray-300',
    invalid: 'text-red-900 ring-red-300 focus:ring-red-500',
    disabled: 'cursor-not-allowed bg-gray-50 ring-gray-300 text-gray-400',
    readOnly: 'cursor-not-allowed bg-indigo-50 ring-gray-300 text-gray-600 tracking-wide',
  },
  buttonContainer: {
    baseStyles: 'absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none',
    readOnly: 'hidden',
  },
  icon: {
    baseStyles: 'h-5 w-5',
    default: 'text-gray-400',
    disabled: 'text-gray-300',
    invalid: 'text-red-300',
  },
}
