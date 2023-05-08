import React from 'react';

export interface CheckboxInputCoreProps extends React.InputHTMLAttributes<HTMLInputElement> {}
  
export const CheckboxInput = (props: CheckboxInputCoreProps) => {
  return (
    <div className={styles.container}>
      <input
        {...props}
        type="checkbox"
        className={styles.input}
      />
    </div>
  );
}

const styles = {
  container: 'flex h-6 items-center',
  input: 'h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600',
};