import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RadioGroupField, RadioGroupFieldProps } from '../components/Inputs';

export default {
  title: 'Form/Toggles/RadioGroup Field',
  component: RadioGroupField,
  args: {
    legend: 'How would you rate the last book you read?',
    touched: false,
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
    errorText: 'Invalid selection.',
  },
} as ComponentMeta<typeof RadioGroupField>;

const Template: ComponentStory<typeof RadioGroupField> = ({ value, invalid, ...args }: RadioGroupFieldProps) => {
  const [val, setVal] = React.useState<string>(value);
  const [touched, setTouched] = React.useState<boolean>(args.touched || false);
  const [showInvalid, setShowInvalid] = React.useState<boolean>(invalid || false);
  const cachedInvalidVal = React.useRef<string>('');

  const containerStyle = { maxWidth: args.inlineLegend ? '640px' : '480px' };

  React.useEffect(() => {
    if (invalid) {
      setShowInvalid(true);
      setTouched(true);
    }
  }, [invalid]);

  React.useEffect(() => {
    if (invalid && !cachedInvalidVal.current) cachedInvalidVal.current = val;
  }, [invalid, val]);

  const updateVal = React.useCallback((newVal: string) => {
    setVal(newVal);
    setTouched(true);
    setShowInvalid(cachedInvalidVal.current === newVal);
  }, [setVal, setTouched]);

  return (
    <div style={containerStyle}>
      <RadioGroupField
        {...args}
        value={val}
        invalid={showInvalid}
        onChange={updateVal}
        touched={touched}
      />
    </div>
  );
};

export const Default = Template.bind({});
export const DisabledRadioGroup = Template.bind({});
export const InvalidRadioGroup = Template.bind({});
export const ReadOnlyRadioGroup = Template.bind({});
export const RequiredRadioGroup = Template.bind({});
export const WithRadioButtonAlignedRight = Template.bind({});

Default.args = {};

DisabledRadioGroup.args = {
  disabled: true,
};

InvalidRadioGroup.args = {
  invalid: true,
  touched: true,
};

ReadOnlyRadioGroup.args = {
  readOnly: true,
};

RequiredRadioGroup.args = {
  required: true,
};

WithRadioButtonAlignedRight.args = {
  alignRadioButtonRight: true,
};
