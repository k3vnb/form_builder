import { RequiredText } from './RequiredText';

interface LabelContainerProps {
  inline?: boolean;
  required?: boolean;
  children: React.ReactNode;
}

export const LabelContainer = ({
  inline = false,
  required = false,
  children,
}: LabelContainerProps) => {

  const containerClassNames = inline ? styles.inlineLabel : styles.default;

  return (
    <div className={containerClassNames}>
      {children}
      <RequiredText inline={inline} required={required} />
    </div>
  );
};

const styles ={
  default: 'flex justify-between items-end gap-x-4',
  inlineLabel: 'flex gap-x-1.5 whitespace-pre-wrap',
}