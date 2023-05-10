import React from 'react';
import { LabelContainer } from './bin';

export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  text: string;
  htmlFor: string;
  inline?: boolean;
  srOnly?: boolean;
  required?: boolean;
}

type LegendProps = Omit<LabelProps, 'htmlFor'>;

export const Label = ({
  text,
  htmlFor,
  inline = false,
  srOnly = false,
  required = false,
}: LabelProps) => {

  if (srOnly) return <label htmlFor={htmlFor} className="sr-only">{text}</label>;

  return (
    <LabelContainer inline={inline} required={required}>
      <label htmlFor={htmlFor} className={styles.label}>
        {text}
      </label>
    </LabelContainer>
  );
};

export const Legend = ({
  text,
  inline = false,
  srOnly = false,
  required = false,
}: LegendProps) => {
  
  if (srOnly) return <legend className="sr-only">{text}</legend>;
  
  return (
    <LabelContainer inline={inline} required={required}>
      <legend className={styles.label}>
        {text}
      </legend>
    </LabelContainer>
  );
};

const styles ={
  label: 'block text-sm font-bold leading-6 text-gray-700 text-wrap',
}
