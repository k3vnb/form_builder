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

export const Default = Template.bind({});
export const DisabledComboBox = Template.bind({});
export const InvalidComboBox = Template.bind({});
export const ReadOnlyComboBox = Template.bind({});
export const RequiredComboBox = Template.bind({});
export const WithDisabledOptions = Template.bind({});
export const WithOptionDescriptions = Template.bind({});

Default.args = {};

DisabledComboBox.args = {
  disabled: true,
  value: userLists.default[1].id,
};

InvalidComboBox.args = {
  invalid: true,
  touched: true,
  required: true,
  value: '',
  errorText: 'This field is required.',
};

ReadOnlyComboBox.args = {
  value: userLists.default[1].id,
  readOnly: true,
};

RequiredComboBox.args = {
  required: true,
};

WithDisabledOptions.args = {
  options: userLists.withSomeDisabled,
};

WithOptionDescriptions.args = {
  options: userLists.withDescriptions,
};
