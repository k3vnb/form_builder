import React from 'react';

export interface ButtonProps {
  text: string;
  title?: string;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  text,
  title='',
  disabled = false,
  onClick
}: ButtonProps): JSX.Element => {
  return (
    <button
      title={title || text}
      className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
