import React from 'react';

import { Legend } from '../../../Label';
import { InputHelperText, InputFieldLayout } from '../../bin';
import { CheckboxField, CheckboxFieldProps } from '../CheckboxField';

import { getInputStyles } from '../../util';
import { formatIdFromString } from '../../../../util';
import { getAriaDescribedById, getInputAriaAttributes } from '../../bin/util';

export interface CheckboxGroupFieldProps extends Omit<React.HTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
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
  options?: CheckboxFieldProps[];
  values?: string[];
  onChange?: (values: string[]) => void;
  alignCheckboxRight?: boolean;
}

export const CheckboxGroupField = ({
  legend,
  touched = false,
  invalid = false,
  required = false,
  disabled = false,
  readOnly = false,
  errorText = '',
  helperText = '',
  values = [],
  options = [],
  hideLegend = false,
  inlineLegend = false,
  showDividers = false,
  alignCheckboxRight = false,
  onChange = () => {},
  ...htmlFieldSetProps
}: CheckboxGroupFieldProps) => {
  const id = React.useMemo(() => htmlFieldSetProps.id ?? formatIdFromString(legend), [htmlFieldSetProps.id, legend]);
  const showInvalid: boolean = React.useMemo(() => (touched && invalid), [touched, invalid]);
  const showHelperText: boolean = React.useMemo(() => (showInvalid || !!helperText), [showInvalid, helperText]);

  const ariaDescribedById = React.useMemo(() => (
    getAriaDescribedById({ id, isInvalid: showInvalid, show: showHelperText })
  ), [id, showInvalid, showHelperText]);

  const ariaAttributes = React.useMemo(() => (
    getInputAriaAttributes({ ariaDescribedById, isInvalid: showInvalid })
  ), [ariaDescribedById, showInvalid]);

  const styles = React.useMemo(() => (
    getInputStyles(stylesheet, { invalid: showInvalid, disabled, readOnly })
  ), [showInvalid, disabled, readOnly]);

  const optionsListStyles = React.useMemo(() => (
    showDividers ? styles.withDivide : styles.hideDivide
  ), [styles, showDividers]);

  const updateValues = React.useCallback((val: string) => {
    if (values.includes(val)) return onChange(values.filter((v) => v !== val));
    return onChange([...values, val]);
  }, [values, onChange]);

  return (
    <fieldset
      disabled={disabled}
      className={styles.container}
      {...htmlFieldSetProps}
      {...ariaAttributes}
    >
      <InputFieldLayout.MainContainer inlineLabel={inlineLegend}>
        <InputFieldLayout.LabelContainer inlineLabel={inlineLegend} hideLabel={hideLegend}>
          <div>
            <Legend
              required={required}
              inline={inlineLegend}
              text={legend}
              srOnly={hideLegend}
            />
          </div>
        </InputFieldLayout.LabelContainer>
        <InputFieldLayout.InputContainer inlineLabel={inlineLegend}>
          <div className={optionsListStyles}>
            {options.map((option) => (
              <CheckboxField
                {...option}
                key={option.id ?? option.label}
                disabled={disabled || option.disabled}
                readOnly={readOnly || option.readOnly}
                checked={values.includes(option.id)}
                onChange={() => updateValues(option.id)}
                alignCheckboxRight={option.alignCheckboxRight || alignCheckboxRight}
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
};

const stylesheet = {
  container: {
    baseStyles: 'pr-4 border-r-4 rounded-sm',
    default: 'border-transparent',
    invalid: 'border-red-300',
  },
  withDivide: 'divide-y divide-gray-200',
  hideDivide: 'divide-y divide-transparent',
};
