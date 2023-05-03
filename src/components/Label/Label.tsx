export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  text: string;
  srOnly?: boolean;
  required?: boolean;
}

export const Label = ({ text, htmlFor, srOnly = false, required = false }: LabelProps) => {
  if (srOnly) return <label htmlFor={htmlFor} className="sr-only">{text}</label>;

  return (
    <div className="flex justify-between">
      <label htmlFor={htmlFor} className={styles.label}>
        {text}
      </label>
      {required && (
        <span className={styles.cornerText}>
          Required
        </span>
      )}
    </div>
  );
};

const styles ={
  cornerText: 'text-sm leading-6 text-gray-500',
  label: 'block text-sm font-medium leading-6 text-gray-900',
}
