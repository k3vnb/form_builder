import React from 'react';
import { Legend } from '../../../Label';
import { InputHelperText, InputFieldLayout } from '../../bin';
import { Checkbox, CheckboxProps } from '../Checkbox';

export interface CheckboxGroupFieldProps {
  legend: string;
  touched?: boolean;
  invalid?: boolean;
  readOnly: boolean;
  required?: boolean;
  disabled?: boolean;
  hideLegend?: boolean;
  inlineLegend?: boolean;
  errorText?: string;
  helperText?: string;
  options?: CheckboxProps[];
}

export const CheckboxGroupField = ({
  legend,
  touched = false,
  invalid = false,
  disabled = false,
  errorText = '',
  helperText = '',
  hideLegend = false,
  inlineLegend = false,
  options = [],
}: CheckboxGroupFieldProps) => {
  return (
    <fieldset disabled={disabled}>
      <InputFieldLayout.MainContainer inlineLabel={inlineLegend}>
        <InputFieldLayout.LabelContainer inlineLabel={inlineLegend} hideLabel={hideLegend}>
          <Legend
            text={legend}
            srOnly={hideLegend}
          />
        </InputFieldLayout.LabelContainer>
        <InputFieldLayout.InputContainer inlineLabel={inlineLegend}>
          <div className="space-y-5">
            {options.map((option) => (
              <Checkbox
                {...option}
                key={option.id ?? option.label}
                disabled={disabled || option.disabled}
              />
            ))}
          </div>
        </InputFieldLayout.InputContainer>
      </InputFieldLayout.MainContainer>
    </fieldset>
  );

}