import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComboBoxField, ComboBoxFieldProps } from '../components/Inputs';
import { userLists } from './__mocks';

export default {
  title: 'Form/Menus/ComboBox Field',
  component: ComboBoxField,
  args: {
    label: 'Assign to',
    placeholder: 'Search or select a team member',
    touched: false,
    required: false,
    readOnly: false,
    disabled: false,
    hideLabel: false,
    inlineLabel: false,
    options: userLists.default,
    value: '',
  },
} as ComponentMeta<typeof ComboBoxField>;

const Template: ComponentStory<typeof ComboBoxField> = ({ value, invalid, ...args }: ComboBoxFieldProps) => {
  const [val, setVal] = React.useState<string>(value || '');
  const [touched, setTouched] = React.useState<boolean>(args.touched || false);
  const [showInvalid, setShowInvalid] = React.useState<boolean>(invalid || false);

  const containerStyle = { maxWidth: args.inlineLabel ? '480px' : '400px' };

  React.useEffect(() => {
    setVal(value || '');
  }, [value]);

  React.useEffect(() => {
    if (invalid) {
      setShowInvalid(true);
      setTouched(true);
    }
  }, [invalid]);

  const updateVal = React.useCallback((newVal: string) => {
    setVal(newVal);
    setTouched(true);
    if (showInvalid) setShowInvalid(false);
  }, [setVal, setTouched, showInvalid]);

  return (
    <div style={containerStyle}>
      <ComboBoxField
        {...args}
        value={val}
        invalid={showInvalid}
        onChange={updateVal}
        touched={touched}
      />
    </div>
  );
};

export const DefaultComboBox = Template.bind({});

DefaultComboBox.args = {};

export const WithDisabledOptions = Template.bind({});

WithDisabledOptions.args = {
  options: userLists.withSomeDisabled,
};

export const WithOptionDescriptions = Template.bind({});

WithOptionDescriptions.args = {
  options: userLists.withDescriptions,
};

export const InvalidComboBox = Template.bind({});

InvalidComboBox.args = {
  invalid: true,
  touched: true,
  required: true,
  value: '',
  errorText: 'This field is required.',
};
