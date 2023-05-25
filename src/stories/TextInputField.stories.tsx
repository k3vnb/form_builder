import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextInputField, TextInputFieldProps } from '../components/Inputs';

export default {
  title: 'Form/TextInput Field',
  component: TextInputField,
  args: {
    type: 'text',
    label: 'Favorite Palindrome',
    value: '',
    invalid: false,
    required: false,
    readOnly: false,
    disabled: false,
    hideLabel: false,
    inlineLabel: false,
    placeholder: 'e.g., toot',
  },
} as ComponentMeta<typeof TextInputField>;

const validText = 'tacocat';
const errorText = `Value must be "${validText}".`;
const clearErrorText = (errText: string, val:string): boolean => (errText === errorText && val === validText);

const Template: ComponentStory<typeof TextInputField> = ({ value, invalid, ...args }: TextInputFieldProps) => {
  const [val, setVal] = React.useState<string>(value ?? '');
  const [touched, setTouched] = React.useState<boolean>(args.touched ?? false);

  const containerStyle = { maxWidth: args.inlineLabel ? '480px' : '400px' };

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
    <div style={containerStyle}>
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
export const DisabledTextInputField = Template.bind({});
export const InvalidTextInputField = Template.bind({});
export const ReadOnlyTextInputField = Template.bind({});
export const RequiredTextInputField = Template.bind({});

InvalidTextInputField.args = {
  errorText,
  invalid: true,
  touched: true,
  placeholder: 'e.g., toot',
  value: 'kayak',
};

DisabledTextInputField.args = {
  disabled: true,
};

ReadOnlyTextInputField.args = {
  readOnly: true,
  value: 'tacocat',
};

RequiredTextInputField.args = {
  required: true,
  errorText: 'This field cannot be blank.',
};
