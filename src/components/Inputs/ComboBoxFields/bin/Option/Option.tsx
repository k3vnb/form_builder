import React from 'react';
import { Combobox } from '@headlessui/react';
import { OptionCheckIcon } from './OptionCheckIcon';

import { getInputStyles } from '../../../util';
import { InputState } from '../../../types';

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

  const getStyles = (state: InputState) => getInputStyles(stylesheet, state);
  const getContainerStyles = (state: InputState) => getStyles(state).container;

  return (
    <Combobox.Option
      disabled={value.disabled}
      className={({ active, selected, disabled }) => getContainerStyles({ active, selected, disabled })}
      value={value}
    >
      {({ selected, active, disabled }) => {
        const styles = getStyles({ selected, active, disabled });
        return (
          <>
            <span className={styles.display}>
              {value.display}
            </span>
            {value.description && (
              <span className={styles.description}>
                {value.description}
              </span>
            )}
            <OptionCheckIcon selected={selected} active={active} />
          </>
        )
      }}
    </Combobox.Option>
  )
}

const stylesheet = {
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
