import React from 'react';
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Options, OptionType } from '.';
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

  const [
    inputClassNames,
    buttonClassNames,
    iconClassNames,
  ] = React.useMemo((): string[] => ([
    getInputContainerClassNames(invalid, disabled, readOnly),
    getButtonClassNames(readOnly),
    getIconClassNames(invalid, disabled),
  ]), [invalid, readOnly, disabled]);

  return (
    <div className="relative">
      <Combobox.Input
        placeholder={placeholder}
        className={inputClassNames}
        onChange={(event) => onQueryChange(event.target.value)}
        displayValue={() => displayText}
      />
      <Combobox.Button className={buttonClassNames}>
        <ChevronUpDownIcon className={iconClassNames} aria-hidden="true" />
      </Combobox.Button>
      <Options open={open} options={options} />
    </div>
  );
}

const getInputContainerClassNames = (invalid: boolean, disabled: boolean, readOnly: boolean): string => {
  return [
    styles.inputContainer.baseStyles,
    invalid && styles.inputContainer.invalid,
    (readOnly && styles.inputContainer.readOnly) || (disabled && styles.inputContainer.disabled),
  ].filter(Boolean).join(' ');
};

const getButtonClassNames = (readOnly: boolean): string => {
  return [
    styles.buttonContainer.baseStyles,
    readOnly && styles.buttonContainer.readOnly
  ].filter(Boolean).join(' ');
};

const getIconClassNames = (invalid: boolean, disabled: boolean): string => {
  return [
    styles.icon.baseStyles,
    (invalid && styles.icon.invalid) || (disabled && styles.icon.disabled) || styles.icon.default
  ].join(' ');
};

const styles = {
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
};
