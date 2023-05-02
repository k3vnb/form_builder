import React from 'react';
import { Nullable } from '../../../var/types';

type HTMLDivAttributes = Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>;

export interface InputHelperTextProps extends HTMLDivAttributes {
  id?: Nullable<string>;
  children?: Nullable<React.ReactNode>;
  show?: boolean;
  isInvalid?: boolean;
  text?: string;
}

export const InputHelperText = ({
  id = null,
  show = false,
  text = '',
  isInvalid = false,
  children = null,
}: InputHelperTextProps): JSX.Element => {
  const minHeight = '1.25rem'; // 20px -- matches tailwind default for 'text-sm'
  let classNames = 'mt-2';
  
  if (!show || !id) return <div className={classNames} style={{ minHeight }} />;

  const textColor = isInvalid ? 'text-red-600' : 'text-gray-500';
  classNames = `${classNames} text-sm ${textColor}`;

  // TODO: assert both id and text/children are not null
    
  return (
    <div id={id} className={classNames} style={{ minHeight }}>
      {text || children}
    </div>
  );
}

