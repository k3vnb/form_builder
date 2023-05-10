import React from 'react';
import { Legend } from '../../Label';
import { InputHelperText, InputFieldLayout } from '../bin';
import { RadioField, RadioFieldProps } from './bin';
import { formatIdFromString } from '../../../util';
import { getAriaDescribedById, getInputAriaAttributes } from '../bin/util';

export interface RadioGroupFieldProps extends Omit<React.HTMLAttributes<HTMLFieldSetElement> , 'onChange'> {
  legend: string;
  touched?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
  required?: boolean;
  disabled?: boolean;
  hideLegend?: boolean;
  inlineLegend?: boolean;
  errorText?: string;
  helperText?: string;
  showDividers?: boolean;
  options?: RadioFieldProps[];
  value: string;
  onChange?: (value: string) => void;
  alignRadioButtonRight?: boolean;
}

export const RadioGroupField = ({
  legend,
  touched = false,
  invalid = false,
  required = false,
  disabled = false,
  readOnly = false,
  errorText = '',
  helperText = '',
  value = '',
  options = [],
  hideLegend = false,
  inlineLegend = false,
  showDividers = false,
  alignRadioButtonRight = false,
  onChange = () => {},
  ...htmlFieldSetProps
}: RadioGroupFieldProps) => {
  const id = React.useMemo(() => htmlFieldSetProps.id ?? formatIdFromString(legend), [htmlFieldSetProps.id, legend]);
  const showInvalid: boolean = React.useMemo(() => (touched && invalid), [touched, invalid]);
  const showHelperText: boolean = React.useMemo(() => (showInvalid || !!helperText), [showInvalid, helperText]);
  const val = React.useMemo(() => (value || options[0]?.id || ''), [value, options]);

  const ariaDescribedById = React.useMemo(() => (
    getAriaDescribedById({ id, isInvalid: showInvalid, show: showHelperText })
  ), [id, showInvalid, showHelperText]);

  const ariaAttributes = React.useMemo(() => (
    getInputAriaAttributes({ ariaDescribedById, isInvalid: showInvalid })
  ), [ariaDescribedById, showInvalid]);

  const containerClassNames = React.useMemo(() => (
    showInvalid ? styles.container.invalid : styles.container.default
  ), [showInvalid]);

  const optionsListClassNames = React.useMemo(() => (
    showDividers ? styles.optionsList.divider : styles.optionsList.default
  ), [showDividers]);

  return (
    <fieldset
      disabled={disabled}
      className={containerClassNames}
      {...htmlFieldSetProps}
      {...ariaAttributes}
    >
      <InputFieldLayout.MainContainer inlineLabel={inlineLegend}>
        <InputFieldLayout.LabelContainer inlineLabel={inlineLegend} hideLabel={hideLegend}>
          <Legend
            required={required}
            inline={inlineLegend}
            text={legend}
            srOnly={hideLegend}
          />
        </InputFieldLayout.LabelContainer>
        <InputFieldLayout.InputContainer inlineLabel={inlineLegend}>
          <div className={optionsListClassNames}>
            {options.map((option) => (
              <RadioField
                {...option}
                key={option.id ?? option.label}
                disabled={disabled || option.disabled}
                readOnly={readOnly || option.readOnly}
                checked={val === option.id}
                onChange={() => onChange(option.id)}
                alignRadioButtonRight={option.alignRadioButtonRight || alignRadioButtonRight}
              />
            ))}
          </div>
          <InputHelperText
            id={ariaDescribedById}
            show={showHelperText}
            isInvalid={showInvalid}
            text={errorText || helperText}
          />
        </InputFieldLayout.InputContainer>
      </InputFieldLayout.MainContainer>
    </fieldset>
  );
}

const styles = {
  container: {
    default: 'pr-4 border-r-4 rounded-sm border-transparent',
    invalid: 'pr-4 border-r-4 rounded-sm border-red-300',
  },
  optionsList: {
    default: 'divide-y divide-transparent',
    divider: 'divide-y divide-gray-200',
  },
}
