import React from 'react';
import { Listbox } from '@headlessui/react';

import { OptionType } from './bin';
import { ListBoxLabel } from '../../Label';
import { InputHelperText, InputFieldLayout } from '../bin';
import { ListBoxSelect } from './bin/ListBoxSelect';

export interface SelectMenuFieldProps {
  label: string;
  value?: string;
  options: OptionType[];
  onChange: (value: string) => void;

  touched?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  inlineLabel?: boolean;
  hideLabel?: boolean;
  errorText?: string;
  helperText?: string;
}

export const SelectMenuField = ({
  label,
  value,
  hideLabel = false,
  required = false,
  inlineLabel = false,
  options = [],
  onChange,
}: SelectMenuFieldProps) => {
  const selected = options.find((option) => option.id === value) || null;
  const setSelected = (option: OptionType) => onChange(option.id);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <InputFieldLayout.MainContainer inlineLabel={inlineLabel}>
          <InputFieldLayout.LabelContainer inlineLabel={inlineLabel} hideLabel={hideLabel}>
            <ListBoxLabel
              text={label}
              inline={inlineLabel}
              required={required}
              srOnly={hideLabel}
            />
          </InputFieldLayout.LabelContainer>
          <InputFieldLayout.InputContainer inlineLabel={inlineLabel} hideLabel={hideLabel}>
            <ListBoxSelect
              open={open}
              selected={selected}
              options={options}
            />
          </InputFieldLayout.InputContainer>
        </InputFieldLayout.MainContainer>
      )}
    </Listbox>
  );
}
