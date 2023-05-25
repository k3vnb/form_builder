import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckboxGroupField, CheckboxGroupFieldProps } from '../components/Inputs';

export default {
  title: 'Form/Toggles/CheckboxGroup Field',
  component: CheckboxGroupField,
  args: {
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
    values: [],
  },
} as ComponentMeta<typeof CheckboxGroupField>;

const Template: ComponentStory<typeof CheckboxGroupField> = ({ invalid, values, ...args }: CheckboxGroupFieldProps) => {
  const [vals, setVals] = React.useState<string[]>([...(values || [])]);
  const [touched, setTouched] = React.useState<boolean>(args.touched ?? false);

  const containerStyle = { maxWidth: args.inlineLegend ? '640px' : '480px' };

  const isInvalid = React.useMemo(() => (
    (args.required && !vals.length && touched) || invalid
  ), [args.required, vals, touched, invalid]);

  const updateVals = React.useCallback((newVals: string[]) => {
    setVals(newVals);
    setTouched(true);
  }, [setVals, setTouched]);

  return (
    <div style={containerStyle}>
      <CheckboxGroupField
        {...args}
        invalid={isInvalid}
        values={vals}
        onChange={updateVals}
        touched={touched}
      />
    </div>
  );
};

export const Default = Template.bind({});
export const DisabledCheckboxGroup = Template.bind({});
export const InvalidCheckboxGroup = Template.bind({});
export const ReadOnlyCheckboxGroup = Template.bind({});
export const RequiredCheckboxGroup = Template.bind({});
export const WithCheckboxAlignedRight = Template.bind({});

Default.args = {};

DisabledCheckboxGroup.args = {
  disabled: true,
};

InvalidCheckboxGroup.args = {
  invalid: true,
  touched: true,
  required: true,
  values: [],
  errorText: 'This field is required.',
};

ReadOnlyCheckboxGroup.args = {
  readOnly: true,
  values: ['1'],
};

RequiredCheckboxGroup.args = {
  required: true,
};

WithCheckboxAlignedRight.args = {
  alignCheckboxRight: true,
};
