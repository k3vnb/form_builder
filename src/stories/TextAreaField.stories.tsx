import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextAreaField, TextAreaFieldProps } from '../components/Inputs';

export default {
  title: 'Form/TextAreaField',
  component: TextAreaField,
  args: {
    label: 'Describe your favorite book:',
    value: '',
    invalid: false,
    required: false,
    readOnly: false,
    disabled: false,
    hideLabel: false,
    inlineLabel: false,
    placeholder: '',
  },
} as ComponentMeta<typeof TextAreaField>;

const validText = 'tacocat';
const errorText = `Value must be "${validText}".`;
const clearErrorText = (errText: string, val:string): boolean => (errText === errorText && val === validText);

const Template: ComponentStory<typeof TextAreaField> = ({ value, invalid, ...args }: TextAreaFieldProps) => {
  const [val, setVal] = React.useState<string>(value ?? '');
  const [touched, setTouched] = React.useState<boolean>(args.touched ?? false);

  const containerWidth = 'w-96';
  
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
    <div className={containerWidth}>
      <TextAreaField
        {...args}
        rows={4}
        invalid={isInvalid}
        value={val}
        onChange={setVal}
        touched={touched}
        onBlur={() => setTouched(true)}
      />
    </div>
  );
};

export const DefaultTextAreaField = Template.bind({});
export const DisabledTextAreaField = Template.bind({});
export const InvalidTextAreaField = Template.bind({});
export const ReadOnlyTextAreaField = Template.bind({});

InvalidTextAreaField.args = {
  required: true,
  touched: true,
  errorText: 'This field cannot be blank.',
};

DisabledTextAreaField.args = {
  disabled: true,
};

ReadOnlyTextAreaField.args = {
  readOnly: true,
  value: 'A strange book about a cat and a hat and managing chaotic elements one cannot predict.',
};
