import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SelectMenuField, SelectMenuFieldProps } from '../components/Inputs';
import { userLists } from './__mocks';

export default {
  title: 'Form/Menus/SelectMenu Field',
  component: SelectMenuField,
  args: {
    label: 'Assign to',
    touched: false,
    required: false,
    readOnly: false,
    disabled: false,
    hideLabel: false,
    inlineLabel: false,
    options: userLists.default,
    value: '',
  },
} as ComponentMeta<typeof SelectMenuField>;

const Template: ComponentStory<typeof SelectMenuField> = ({ value, invalid, ...args }: SelectMenuFieldProps) => {
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
      <SelectMenuField
        {...args}
        value={val}
        invalid={showInvalid}
        onChange={updateVal}
        touched={touched}
      />
    </div>
  );
};

export const DefaultSelectMenu = Template.bind({});

DefaultSelectMenu.args = {};

export const WithDisabledOptions = Template.bind({});

WithDisabledOptions.args = {
  options: userLists.withSomeDisabled,
};

export const WithOptionDescriptions = Template.bind({});

WithOptionDescriptions.args = {
  options: userLists.withDescriptions,
};

export const InvalidSelectMenu = Template.bind({});

InvalidSelectMenu.args = {
  invalid: true,
  touched: true,
  required: true,
  value: '',
  errorText: 'This field is required.',
};
