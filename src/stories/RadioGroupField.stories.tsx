import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RadioGroupField, RadioGroupFieldProps } from '../components/Inputs';

export default {
  title: 'Form/RadioGroup Field',
  component: RadioGroupField,
  args: {
    legend: 'How would you rate the last book you read?',
    touched: false,
    required: true,
    readOnly: false,
    disabled: false,
    hideLegend: false,
    showDividers: true,
    inlineLegend: false,
    options: [
      { id: '1', label: 'Not good', description: 'You found this book particularly unenjoyable.' },
      { id: '2', label: 'Just OK', description: 'You could take it or leave it.' },
      { id: '3', label: 'Pretty good', description: 'You enjoyed this book.' },
      { id: '4', label: 'Great!', description: 'You loved this book.' },
    ],
    value: '1',
  },
} as ComponentMeta<typeof RadioGroupField>;

const Template: ComponentStory<typeof RadioGroupField> = ({ value, ...args }: RadioGroupFieldProps) => {
  const [val, setVal] = React.useState<string>(value);
  const [touched, setTouched] = React.useState<boolean>(args.touched ?? false);

  const containerStyle = { maxWidth: args.inlineLegend ? '640px' : '480px' };

  const updateVal = React.useCallback((newVal: string) => {
    setVal(newVal);
    setTouched(true);
  }, [setVal, setTouched]);

  return (
    <div style={containerStyle}>
      <RadioGroupField
        {...args}
        value={val}
        onChange={updateVal}
        touched={touched}
      />
    </div>
  );
};

export const RadioGroup = Template.bind({});

RadioGroup.args = {};

export const WithRadioButtonAlignedRight = Template.bind({});

WithRadioButtonAlignedRight.args = {
  alignRadioButtonRight: true,
};
