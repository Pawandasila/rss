import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonRSSProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  rounded?: 'default' | 'left-br' | 'full' | 'none';
}

const ButtonRSS: React.FC<ButtonRSSProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  target,
  rel,
  rounded = 'left-br',
}) => {
  
  const baseStyles = `
    font-poppins font-semibold transition-all duration-300 transform 
    hover:scale-105 hover:shadow-xl border-2 backdrop-blur-sm
    inline-flex items-center justify-center text-center
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  
  const variantStyles = {
    primary: `
      bg-primary hover:bg-primary/90 text-white 
      border-primary hover:border-orange-400
    `,
    secondary: `
      bg-gray-600 hover:bg-gray-700 text-white 
      border-gray-600 hover:border-gray-500
    `,
    outline: `
      bg-transparent hover:bg-primary hover:text-white text-primary 
      border-primary hover:border-primary
    `,
    ghost: `
      bg-transparent hover:bg-primary/10 text-primary 
      border-transparent hover:border-primary/20
    `,
  };

  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
    xl: 'px-12 py-4 text-xl',
  };

  
  const roundedStyles = {
    default: 'rounded-lg',
    'left-br': 'rounded-l-full rounded-br-full',
    full: 'rounded-full',
    none: 'rounded-none',
  };

  
  const combinedStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    roundedStyles[rounded],
    className
  );

  
  if (href) {
    return (
      <Link
        href={href}
        className={combinedStyles}
        target={target}
        rel={rel}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  
  return (
    <button
      onClick={onClick}
      className={combinedStyles}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default ButtonRSS;


export const PrimaryButton: React.FC<Omit<ButtonRSSProps, 'variant'>> = (props) => (
  <ButtonRSS variant="primary" {...props} />
);

export const SecondaryButton: React.FC<Omit<ButtonRSSProps, 'variant'>> = (props) => (
  <ButtonRSS variant="secondary" {...props} />
);

export const OutlineButton: React.FC<Omit<ButtonRSSProps, 'variant'>> = (props) => (
  <ButtonRSS variant="outline" {...props} />
);

export const GhostButton: React.FC<Omit<ButtonRSSProps, 'variant'>> = (props) => (
  <ButtonRSS variant="ghost" {...props} />
);
