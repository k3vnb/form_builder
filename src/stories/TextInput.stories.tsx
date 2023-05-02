import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextInput, TextInputProps } from '../components/Inputs';

export default {
  title: 'Form/TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>;

const noOp = () => {};

const Template: ComponentStory<typeof TextInput> = (args: TextInputProps) => (
  <div className='w-64'>
    <TextInput {...args} />
  </div>
);

export const DefaultTextInput = Template.bind({});

DefaultTextInput.args = {
  value: '',
  type: 'text',
  label: 'Label',
  hideLabel: false,
  onChange: noOp,
  onBlur: noOp,
  invalid: false,
  required: false,
  readOnly: false,
  disabled: false,
  placeholder: 'Enter your text...',
};
