import React from 'react';
import { Legend } from '../../../Label';
import { InputHelperText, InputFieldLayout } from '../../bin';
import { Checkbox, CheckboxProps } from '../Checkbox';
import { formatIdFromString } from '../../../../util';
import { getAriaDescribedById, getInputAriaAttributes } from '../../bin/util';

export interface CheckboxGroupFieldProps extends React.HTMLAttributes<HTMLFieldSetElement> {
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
  options?: CheckboxProps[];
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
  hideLegend = false,
  inlineLegend = false,
  showDividers = false,
  options = [],
  alignCheckboxRight = false,
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

  const containerClassNames = React.useMemo(() => (
    showInvalid ? styles.container.invalid : styles.container.default
  ), [showInvalid]);

  const checkboxListClassNames = React.useMemo(() => (
    showDividers ? styles.checkboxList.divider : styles.checkboxList.default
  ), [showDividers]);

  return (
    <fieldset disabled={disabled} className={containerClassNames} {...ariaAttributes}>
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
          <div className={checkboxListClassNames}>
            {options.map((option) => (
              <Checkbox
                {...option}
                key={option.id ?? option.label}
                disabled={disabled || option.disabled}
                readOnly={readOnly || option.readOnly}
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
}

const styles = {
  container: {
    default: 'pr-4 border-r-4 border-transparent',
    invalid: 'pr-4 border-r-4 border-red-300',
  },
  checkboxList: {
    default: 'divide-y divide-transparent',
    divider: 'divide-y divide-gray-200',
  },
}
