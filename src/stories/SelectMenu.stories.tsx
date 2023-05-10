import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectMenuField, SelectMenuFieldProps } from '../components/Inputs';

const options = [
  { id: '1', display: 'Tom Cooper' },
  { id: '2', display: 'Syd Richmond' },
  { id: '3', display: 'Derrick Lowry' },
  { id: '4', display: 'Tom Cook' },
  { id: '5', display: 'Ayesha Mclaughlin' },
  { id: '6', display: 'Curtis Mathis' },
  { id: '7', display: 'Helen Hilton' },
  { id: '8', display: 'Mark Sharpe' },
  { id: '9', display: 'Lucie Turner' },
  { id: '10', display: 'Effie Hancock' },
];

export default {
  title: 'Form/SelectMenuField',
  component: SelectMenuField,
  args: {
    label: 'Assign to',
    touched: false,
    required: true,
    readOnly: false,
    disabled: false,
    hideLabel: false,
    inlineLabel: false,
    options,
    value: '',
  },
} as ComponentMeta<typeof SelectMenuField>;

const Template: ComponentStory<typeof SelectMenuField> = ({ value, ...args }: SelectMenuFieldProps) => {
  const [val, setVal] = React.useState<string>(value || '');
  const [touched, setTouched] = React.useState<boolean>(args.touched ?? false);

  const containerStyle = { maxWidth: args.inlineLabel ? '480px' : '400px' };

  React.useEffect(() => {
    setVal(value || '');
  }, [value]);

  const updateVal = React.useCallback((newVal: string) => {
    setVal(newVal);
    setTouched(true);
  }, [setVal, setTouched]);

  return (
    <div style={containerStyle}>
      <SelectMenuField
        {...args}
        value={val}
        onChange={updateVal}
        touched={touched}
      />
    </div>
  );
};

export const SelectMenu = Template.bind({});

SelectMenu.args = {};
