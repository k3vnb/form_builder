import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextInput, TextInputProps } from '../components/Inputs';

export default {
  title: 'Form/TextInput',
  component: TextInput,
  args: {
    type: 'text',
    label: 'Label',
    value: '',
    invalid: false,
    required: false,
    readOnly: false,
    disabled: false,
    placeholder: 'Enter your text...',
  },
} as ComponentMeta<typeof TextInput>;

const validText = 'taco cat';
const errorText = `Value must be "${validText}".`;
const clearErrorText = (errText: string, val:string): boolean => (errText === errorText && val === validText);

const Template: ComponentStory<typeof TextInput> = ({ value, invalid, ...args }: TextInputProps) => {
  const [val, setVal] = React.useState<string>(value ?? '');
  const [touched, setTouched] = React.useState<boolean>(args.touched ?? false);
  
  const shouldClearInvalid = React.useMemo(() => (
    clearErrorText(args.errorText || '', val)
  ), [args.errorText, val]);

  React.useEffect(() => {
    setVal(value ?? '');
  }, [value]);

  return (
    <div className='w-64'>
      <TextInput
        {...args}
        invalid={invalid && !shouldClearInvalid}
        value={val}
        onChange={setVal}
        touched={touched}
        onBlur={() => setTouched(true)}
      />
    </div>
  );
};

export const DefaultTextInput = Template.bind({});

export const InvalidTextInput = Template.bind({});

InvalidTextInput.args = {
  errorText,
  invalid: true,
  touched: true,
  value: 'Not taco cat',
};
