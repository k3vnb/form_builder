import React from 'react';

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

  const requiredText = React.useMemo(() => {
    if (!required) return null;
    if (inline) return <span className={styles.requiredText.inline}>*</span>;
    return <span className={styles.requiredText.default}>Required</span>;
  }, [required, inline]);

  if (srOnly) return <label htmlFor={htmlFor} className="sr-only">{text}</label>;

  const containerClassNames = inline ? styles.container.inlineLabel : styles.container.default;

  return (
    <div className={containerClassNames}>
      <label htmlFor={htmlFor} className={styles.label}>
        {text}
      </label>
      {requiredText}
    </div>
  );
};

export const Legend = ({
  text,
  inline = false,
  srOnly = false,
  required = false,
}: LegendProps) => {
  
  const requiredText = React.useMemo(() => {
    if (!required) return null;
    if (inline) return <span className={styles.requiredText.inline}>*</span>;
    return <span className={styles.requiredText.default}>Required</span>;
  }, [required, inline]);
  
  if (srOnly) return <legend className="sr-only">{text}</legend>;
  
  const containerClassNames = inline ? styles.container.inlineLabel : styles.container.default;

  return (
    <div className={containerClassNames}>
      <legend className={styles.label}>
        {text}
      </legend>
      {requiredText}
    </div>
  );
};

const styles ={
  container: {
    default: 'flex justify-between items-end gap-x-4',
    inlineLabel: 'flex gap-x-1.5 whitespace-pre-wrap',
  },
  label: 'block text-sm font-bold leading-6 text-gray-700 text-wrap',
  requiredText: {
    default: 'text-sm leading-6 text-gray-500',
    inline: 'align-super text-xl leading-6 text-indigo-500 -mt-0.5',
  },
}
