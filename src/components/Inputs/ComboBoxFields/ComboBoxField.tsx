import React from 'react';
import { Combobox } from '@headlessui/react';

import { ComboBoxLabel } from '../../Label';
import { OptionType, ComboBoxInput } from './bin';
import { InputHelperText, InputFieldLayout } from '../bin';

import { formatIdFromString } from '../../../util';

export interface ComboBoxFieldProps {
  label: string;
  value?: string;
  options: OptionType[];
  touched?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  hideLabel?: boolean;
  inlineLabel?: boolean;
  placeholder?: string;
  errorText?: string;
  helperText?: string;
  onChange: (value: string) => void;
}

export const ComboBoxField = ({
  label,
  value = '',
  touched = false,
  invalid = false,
  disabled = false,
  required = false,
  readOnly = false,
  hideLabel = false,
  inlineLabel = false,
  placeholder = '',
  options = [],
  errorText = '',
  helperText = '',
  onChange,
}: ComboBoxFieldProps) => {
  const selectedOption = options.find((option) => option.id === value) || null;
  const setSelectedOption = (option: OptionType) => onChange(option.id);

  const [query, setQuery] = React.useState<string>('');

  const showInvalid: boolean = React.useMemo(() => (touched && invalid), [touched, invalid]);
  const showHelperText: boolean = React.useMemo(() => (showInvalid || !!helperText), [showInvalid, helperText]);
  const helperTextId: string = React.useMemo(() => (showHelperText ? `${formatIdFromString(label)}_help_text` : ''), [label, showHelperText]);

  const getFormattedQuery = () => query.trim().toLowerCase();
  const getFilteredOptions = () => options.filter((o) => o.display.toLowerCase().includes(getFormattedQuery()));
  const filteredOptions = !query ? options : getFilteredOptions();

  return (
    <Combobox
      as="div"
      value={selectedOption}
      disabled={disabled || readOnly}
      onChange={setSelectedOption}
    >
      {(renderProps) => (
        <InputFieldLayout.MainContainer inlineLabel={inlineLabel}>
          <InputFieldLayout.LabelContainer inlineLabel={inlineLabel} hideLabel={hideLabel}>
            <ComboBoxLabel
              text={label}
              inline={inlineLabel}
              required={required}
              srOnly={hideLabel}
            />
          </InputFieldLayout.LabelContainer>
          <InputFieldLayout.InputContainer inlineLabel={inlineLabel} hideLabel={hideLabel}>
            <ComboBoxInput
              {...renderProps}
              options={filteredOptions}
              readOnly={readOnly}
              disabled={disabled}
              invalid={showInvalid}
              placeholder={placeholder}
              onQueryChange={setQuery}
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
    </Combobox>
  );
}
