import React from 'react';

type ContainerType = 'mainContainer' | 'labelContainer' | 'inputContainer';

interface InputFieldLayoutProps {
  inlineLabel?: boolean;
  hideLabel?: boolean;
  children: React.ReactNode;
}

interface ContainerProps extends InputFieldLayoutProps {
  containerType: ContainerType;
}

const Container = ({
  containerType,
  hideLabel = false,
  inlineLabel = false,
  children
}: ContainerProps): JSX.Element => {

  const containerClassNames = React.useMemo((): string => (
    getContainerClassNames({ containerType, inlineLabel, hideLabel })
  ), [inlineLabel, containerType, hideLabel]);

  return (
    <div className={containerClassNames}>
      {children}
    </div>
  );
}

const MainContainer = (props: InputFieldLayoutProps): JSX.Element => <Container containerType="mainContainer" {...props} />;
const LabelContainer = (props: InputFieldLayoutProps): JSX.Element => <Container containerType="labelContainer" {...props} />;
const InputContainer = (props: InputFieldLayoutProps): JSX.Element => <Container containerType="inputContainer" {...props} />;

export const InputFieldLayout = {
  MainContainer,
  LabelContainer,
  InputContainer,
}

const styles = {
  mainContainer: {
    default: 'flex flex-col gap-2',
    hideLabel: '',
    inlineLabel: 'flex items-baseline gap-x-2.5',
  },
  labelContainer: {
    default: 'w-full',
    hideLabel: 'w-0',
    inlineLabel: 'w-1/3',
  },
  inputContainer: {
    default: 'flex flex-col gap-2',
    hideLabel: '',
    inlineLabel: 'flex-grow',
  },
}

const getContainerClassNames = ({ containerType, hideLabel, inlineLabel }: Omit<ContainerProps, 'children'>): string => {
  const container = styles[containerType];
  
  if (inlineLabel && hideLabel) return container.hideLabel || container.inlineLabel;
  if (inlineLabel) return container.inlineLabel;
  return container.default;
}
