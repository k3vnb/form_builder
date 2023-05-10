import React from 'react';
import { LabelContainer, labelClassNames } from './bin';

export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  text: string;
  htmlFor: string;
  inline?: boolean;
  srOnly?: boolean;
  required?: boolean;
}

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
      <label htmlFor={htmlFor} className={labelClassNames}>
        {text}
      </label>
    </LabelContainer>
  );
};
