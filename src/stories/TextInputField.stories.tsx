import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextInputField, TextInputFieldProps } from '../components/Inputs';

export default {
  title: 'Form/TextInputField',
  component: TextInputField,
  args: {
    type: 'text',
    label: 'Input Label',
    value: '',
    invalid: false,
    required: false,
    readOnly: false,
    disabled: false,
    hideLabel: false,
    inlineLabel: false,
    placeholder: 'Enter your text...',
  },
} as ComponentMeta<typeof TextInputField>;

const validText = 'taco cat';
const errorText = `Value must be "${validText}".`;
const clearErrorText = (errText: string, val:string): boolean => (errText === errorText && val === validText);

const Template: ComponentStory<typeof TextInputField> = ({ value, invalid, ...args }: TextInputFieldProps) => {
  const [val, setVal] = React.useState<string>(value ?? '');
  const [touched, setTouched] = React.useState<boolean>(args.touched ?? false);
  
  const shouldClearInvalid = React.useMemo(() => (
    clearErrorText(args.errorText || '', val)
  ), [args.errorText, val]);

  const isInvalid = React.useMemo(() => (
    (args.required && !val) || (invalid && !shouldClearInvalid)
  ), [args.required, val, invalid, shouldClearInvalid]);


  React.useEffect(() => {
    setVal(value ?? '');
  }, [value]);

  return (
    <div className='w-72'>
      <TextInputField
        {...args}
        invalid={isInvalid}
        value={val}
        onChange={setVal}
        touched={touched}
        onBlur={() => setTouched(true)}
      />
    </div>
  );
};

export const DefaultTextInputField = Template.bind({});

export const InvalidTextInputField = Template.bind({});

InvalidTextInputField.args = {
  errorText,
  invalid: true,
  touched: true,
  value: 'Not taco cat',
};

export const RequiredTextInputField = Template.bind({});

RequiredTextInputField.args = {
  required: true,
  errorText: 'This field cannot be blank.',
};

