import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ButtonProps } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const noOp = () => {};

const Template: ComponentStory<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const PrimaryButton = Template.bind({});

PrimaryButton.args = {
  text: 'Primary Button',
  onClick: noOp,
};
