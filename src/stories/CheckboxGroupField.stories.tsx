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

  const containerStyle = { maxWidth: '900px' };
  
  const shouldClearInvalid = false; //React.useMemo(() => (
    // clearErrorText(args.errorText || '', val)
  // ), [args.errorText, val]);

  const isInvalid = React.useMemo(() => (
    (args.required && !val) || (invalid && !shouldClearInvalid)
  ), [args.required, val, invalid, shouldClearInvalid]);


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
