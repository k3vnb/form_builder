import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextAreaField, TextAreaFieldProps } from '../components/Inputs';

export default {
  title: 'Form/TextArea Field',
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

const emptyErrorText = 'This field cannot be blank.';
const genericErrorText = 'Invalid entry.';

const Template: ComponentStory<typeof TextAreaField> = ({ value, ...args }: TextAreaFieldProps) => {
  const [val, setVal] = React.useState<string>(value || '');
  const [isTouched, setIsTouched] = React.useState<boolean>(args.touched || args.invalid || false);

  const containerWidth = 'w-96';

  const isInvalidEmptyState = React.useMemo(() => (
    args.required && !val && isTouched
  ), [args.required, val, isTouched]);

  const isInvalid = React.useMemo(() => (
    args.invalid || isInvalidEmptyState
  ), [args.invalid, isInvalidEmptyState]);

  const errorText = React.useMemo(() => (
    isInvalidEmptyState ? emptyErrorText : (args.errorText || genericErrorText)
  ), [isInvalidEmptyState, args.errorText]);

  React.useEffect(() => {
    setVal(value ?? '');
  }, [value]);

  return (
    <div className={containerWidth}>
      <TextAreaField
        {...args}
        rows={4}
        value={val}
        invalid={isInvalid}
        touched={isTouched || isInvalid}
        errorText={errorText}
        onChange={setVal}
        onBlur={() => setIsTouched(true)}
      />
    </div>
  );
};

export const Default = Template.bind({});
export const DisabledTextArea = Template.bind({});
export const InvalidTextArea = Template.bind({});
export const ReadOnlyTextArea = Template.bind({});
export const RequiredTextArea = Template.bind({});

Default.args = {};

DisabledTextArea.args = {
  disabled: true,
};

InvalidTextArea.args = {
  required: true,
  touched: true,
  invalid: true,
};

ReadOnlyTextArea.args = {
  readOnly: true,
  value: 'A strange book about a cat and a hat and managing chaotic elements one cannot predict.',
};

RequiredTextArea.args = {
  required: true,
};
