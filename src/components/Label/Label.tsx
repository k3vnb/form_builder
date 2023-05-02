export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  text: string;
  srOnly?: boolean;
  required?: boolean;
}

export const Label = ({ text, htmlFor, srOnly = false, required = false }: LabelProps) => {
  const classNames = srOnly ? 'sr-only' : styles.label;
  return (
    <label htmlFor={htmlFor} className={classNames}>
      {text} {required && <span className='align-super'>*</span>}
    </label>
  )
  };

const styles ={
  label: 'block text-sm font-medium leading-6 text-gray-900',
}
