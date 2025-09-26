import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';
  
  const variantClasses = {
    primary: 'bg-[#2E4A70] hover:bg-[#1e3152] text-white shadow-md hover:shadow-lg',
    secondary: 'bg-[#24B0BA] hover:bg-[#1a8b94] text-white shadow-md hover:shadow-lg',
    accent: 'bg-[#73C7E3] hover:bg-[#5bb8db] text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-[#2E4A70] text-[#2E4A70] hover:bg-[#2E4A70] hover:text-white'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button 
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;