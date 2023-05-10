import React from 'react';
import { Listbox } from '@headlessui/react';

import { OptionType } from './bin';
import { ListBoxLabel } from '../../Label';
import { InputHelperText, InputFieldLayout } from '../bin';
import { ListBoxSelect } from './bin/ListBoxSelect';
import { formatIdFromString } from '../../../util';

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
  touched = false,
  invalid = false,
  disabled = false,
  required = false,
  readOnly = false,
  hideLabel = false,
  inlineLabel = false,
  options = [],
  errorText = '',
  helperText = '',
  onChange,
}: SelectMenuFieldProps) => {
  const selectedOption = options.find((option) => option.id === value) || null;
  const setSelectedOption = (option: OptionType) => onChange(option.id);

  const showInvalid: boolean = React.useMemo(() => (touched && invalid), [touched, invalid]);
  const showHelperText: boolean = React.useMemo(() => (showInvalid || !!helperText), [showInvalid, helperText]);
  const helperTextId: string = React.useMemo(() => (showHelperText ? `${formatIdFromString(label)}_help_text` : ''), [label, showHelperText]);

  return (
    <Listbox
      value={selectedOption}
      disabled={disabled || readOnly}
      onChange={setSelectedOption}
    >
      {(renderProps) => (
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
              {...renderProps}
              options={options}
              readOnly={readOnly}
              disabled={disabled}
              invalid={showInvalid}
            />
            <InputHelperText
              id={helperTextId}
              show={showHelperText}
              isInvalid={showInvalid}
              text={errorText || helperText}
            />
          </InputFieldLayout.InputContainer>
        </InputFieldLayout.MainContainer>
      )}
    </Listbox>
  );
}
