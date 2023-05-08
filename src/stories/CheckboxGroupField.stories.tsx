import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckboxGroupField, CheckboxGroupFieldProps } from '../components/Inputs';

export default {
  title: 'Form/CheckboxGroupField',
  component: CheckboxGroupField,
  args: {
    type: 'text',
    legend: 'Books You\'d Recommend',
    touched: false,
    invalid: false,
    required: false,
    readOnly: false,
    disabled: false,
    hideLegend: false,
    showDividers: true,
    inlineLegend: false,
    options: [
      { id: '1', label: 'The Design of Everyday Things', description: 'by Don Norman' },
      { id: '2', label: 'Don\'t Make Me Think', description: 'by Steve Krug' },
      { id: '3', label: '100 Things Every Designer Needs to Know About People', description: 'by Susan Weinschenk' },
    ],
  },
} as ComponentMeta<typeof CheckboxGroupField>;

const Template: ComponentStory<typeof CheckboxGroupField> = ({ invalid, ...args }: CheckboxGroupFieldProps) => {
  const value = '';
  const [val, setVal] = React.useState<string>(value ?? '');
  const [touched, setTouched] = React.useState<boolean>(args.touched ?? false);

  const containerStyle = { maxWidth: args.inlineLegend ? '640px' : '440px' };
  
  const isInvalid = React.useMemo(() => (
    args.required && !val
  ), [args.required, val, invalid]);


  React.useEffect(() => {
    setVal(value ?? '');
  }, [value]);

  return (
    <div style={containerStyle}>
      <CheckboxGroupField
        {...args}
        invalid={isInvalid}
        // value={val}
        // onChange={setVal}
        touched={touched}
        // onBlur={() => setTouched(true)}
      />
    </div>
  );
};

export const CheckboxGroup = Template.bind({});

CheckboxGroup.args = {};

export const InvalidCheckboxGroup = Template.bind({});

InvalidCheckboxGroup.args = {
  invalid: true,
  touched: true,
  required: true,
  errorText: 'This field is required',
};

export const WithCheckboxAlignedRight = Template.bind({});
WithCheckboxAlignedRight.args = {
  alignCheckboxRight: true,
};
