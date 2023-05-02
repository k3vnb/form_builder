import React from 'react';

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'soft';
  colorTheme?: 'default' | 'danger' | 'warning' | 'success';
  rounded?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = (props: ButtonProps): JSX.Element => {
  const {
    text,
    title='',
    variant,
    size,
    colorTheme,
    rounded,
    disabled = false,
    onClick,
    ...htmlButtonProps
  } = props;

  const classNames = getButtonStyles(props);

  return (
    <button
      type="button"
      title={title || text}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      {...htmlButtonProps}
    >
      {text}
    </button>
  );
};

const buttonClassNames = {
  baseStyles: 'font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed',
  sizes: {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2 py-1 text-sm',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-sm',
    xl: 'px-3.5 py-2.5 text-sm',
  },
  variants: {
    primary: {
      baseStyles: 'text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:focus-visible:outline-0 disabled:focus-visible:outline-offset-0',
      default: 'bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 focus-visible:outline-indigo-600',
      danger: 'bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600 focus-visible:outline-red-600',
      warning: 'bg-orange-600 hover:bg-orange-700 disabled:hover:bg-orange-600 focus-visible:outline-orange-600',
      success: 'bg-green-600 hover:bg-green-700 disabled:hover:bg-green-600 focus-visible:outline-green-600',
    },
    secondary: {
      baseStyles: 'bg-white ring-1 ring-inset disabled:hover:bg-white',
      default: 'text-gray-900 hover:bg-gray-50 ring-gray-300',
      danger: 'text-red-600 hover:bg-red-50 ring-red-300',
      warning: 'text-orange-600 hover:bg-orange-50 ring-orange-300',
      success: 'text-green-600 hover:bg-green-50 ring-green-300',
    },
    soft: {
      baseStyles: '',
      default: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:hover:bg-indigo-50',
      danger: 'bg-red-50 text-red-700 hover:bg-red-100 disabled:hover:bg-red-50',
      warning: 'bg-orange-50 text-orange-700 hover:bg-orange-100 disabled:hover:bg-orange-50',
      success: 'bg-green-50 text-green-700 hover:bg-green-100 disabled:hover:bg-green-50',
    },
  },
};

const getButtonStyles = (props: ButtonProps): string => {
  const { size = 'md', variant = 'primary', colorTheme = 'default', rounded = 'false' } = props;

  const baseStyles = buttonClassNames.baseStyles;
  const sizeStyles = buttonClassNames.sizes[size];
  const variantBaseStyles = buttonClassNames.variants[variant].baseStyles;
  const variantStyles = buttonClassNames.variants[variant][colorTheme];

  const getRoundedStyles = (): string => {
    if (rounded) return 'rounded-full';
    return ['xs', 'sm'].includes(size) ? 'rounded' : 'rounded-md';
  };

  const classNames = [baseStyles, sizeStyles, variantBaseStyles, variantStyles, getRoundedStyles()].filter(Boolean).join(' ');
  
  return classNames;
};
