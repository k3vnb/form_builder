import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
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
      as={React.Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className={styles.optionsContainer}>
        {options.map((option) => (
          <Option
            key={option.id}
            value={option}
          />
        ))}
      </Listbox.Options>
    </Transition>
  )
}

const styles = {
  optionsContainer: 'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm',
};
