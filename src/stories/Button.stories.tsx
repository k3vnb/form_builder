import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ButtonProps } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const noOp = () => {};

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const ComposableButton = Template.bind({});

ComposableButton.args = {
  text: 'Button',
  onClick: noOp,
  title: 'Tooltip text',
  size: 'md',
  variant: 'primary',
  colorTheme: 'default',
  rounded: false,
  disabled: false,
};
