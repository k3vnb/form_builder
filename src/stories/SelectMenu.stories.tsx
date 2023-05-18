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
    options,
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
  options: options.map((o, i) => ({ ...o, disabled: (i+1) % 4 === 0 })),
};

export const WithOptionDescriptions = Template.bind({});

const formatUserName = (name: string) => '@' + name.split(' ').map((n,i) => (n.charAt(0).toLowerCase() + (i === 0 ? '' : n.slice(1)))).join('');

WithOptionDescriptions.args = {
  options: options.map((o) => ({ ...o, description: formatUserName(o.display) })),
};

export const InvalidSelectMenu = Template.bind({});

InvalidSelectMenu.args = {
  invalid: true,
  touched: true,
  required: true,
  value: '',
  errorText: 'This field is required.',
};
