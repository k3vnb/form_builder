import React, { Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { Option, OptionType } from './Option';

export interface OptionsProps {
  open?: boolean;
  options: OptionType[];
}

export const Options = ({
  open = false,
  options,
}: OptionsProps) => {

  return (
    <Transition
      show={open}
      as={Fragment}
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Combobox.Options static className={styles.optionsContainer}>
        {options.map((option) => (
          <Option
            key={option.id}
            value={option}
          />
        ))}
      </Combobox.Options>
    </Transition>
  );
};

const styles = {
  optionsContainer: 'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
};
