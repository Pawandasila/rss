import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NormalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: LucideIcon;
  showArrow?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  ariaLabel?: string;
  ariaPressed?: boolean;
  ariaDescribedBy?: string;
  loading?: boolean;
}

const NormalButton: React.FC<NormalButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon: Icon,
  showArrow = true,
  className,
  type = 'button',
  href,
  target = '_self',
  ariaLabel,
  ariaPressed,
  ariaDescribedBy,
  loading = false,
}) => {
  
    // Base styles for all buttons
  const baseStyles = "group cursor-pointer relative overflow-hidden font-semibold transition-all duration-300 ease-in-out rounded-lg inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500";

  
  const variantStyles = {
    primary: "bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white shadow-md hover:shadow-lg",
    ghost: "text-orange-600 hover:bg-orange-50 hover:text-orange-700",
  };

  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm min-w-28",
    md: "px-5 py-2.5 text-base min-w-32",
    lg: "px-6 py-3 text-lg min-w-36",
  };

  
  const disabledStyles = "opacity-50 cursor-not-allowed hover:transform-none focus:ring-gray-300";

  
  const buttonClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabled && disabledStyles,
    loading && "cursor-wait",
    className
  );

  
  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-5 h-5',
  };

  
  const handleClick = () => {
    if (disabled) return;
    
    if (href) {
      window.open(href, target);
    } else if (onClick) {
      onClick();
    }
  };

  
  const buttonContent = (
    <>
      
      {Icon && (
        <Icon className={cn(iconSize[size], "mr-2 transition-transform duration-300 ease-in-out flex-shrink-0")} />
      )}
      
      
      <span className={cn(
        "relative z-10 transition-transform duration-300 ease-in-out text-center",
        showArrow && !disabled && "group-hover:-translate-x-1"
      )}>
        {children}
      </span>
      
      
      {showArrow && !disabled && (
        <ArrowRight className={cn(
          iconSize[size],
          "ml-2 opacity-0 translate-x-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0 flex-shrink-0"
        )} />
      )}
    </>
  );

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={buttonClasses}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-describedby={ariaDescribedBy}
      aria-disabled={disabled || loading}
    >
      {buttonContent}
    </button>
  );
};

export default NormalButton;