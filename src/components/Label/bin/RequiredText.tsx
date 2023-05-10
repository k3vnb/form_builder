interface RequiredTextProps {
  inline?: boolean;
  required?: boolean;
}

export const RequiredText = ({ 
  inline = false,
  required = false,
 }: RequiredTextProps) => {
  if (!required) return null;
  if (inline) return <span className={styles.inline}>*</span>;
  return <span className={styles.default}>Required</span>;
};

const styles ={
  default: 'text-sm leading-6 text-gray-500',
  inline: 'text-xl leading-6 text-indigo-500 align-super -mt-0.5',
}
