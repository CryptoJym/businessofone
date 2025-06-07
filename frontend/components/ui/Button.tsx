import React from 'react';
import { designTokens } from '../../lib/design-tokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantStyles = {
    primary: `
      bg-primary text-white
      hover:bg-primary-600 focus:ring-primary-500
      active:bg-primary-700
    `,
    secondary: `
      bg-gray-200 text-gray-800
      hover:bg-gray-300 focus:ring-gray-500
      active:bg-gray-400
    `,
    accent: `
      bg-accent text-white
      hover:bg-accent-600 focus:ring-accent-500
      active:bg-accent-700
    `,
    outline: `
      border-2 border-primary-500 text-primary
      hover:bg-primary-50 focus:ring-primary-500
      active:bg-primary-100
    `,
    ghost: `
      text-gray-700
      hover:bg-gray-100 focus:ring-gray-500
      active:bg-gray-200
    `,
    danger: `
      bg-red-500 text-white
      hover:bg-red-600 focus:ring-red-500
      active:bg-red-700
    `,
  };

  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5 rounded-md gap-1.5',
    md: 'text-base px-4 py-2 rounded-lg gap-2',
    lg: 'text-lg px-6 py-3 rounded-lg gap-2.5',
    xl: 'text-xl px-8 py-4 rounded-xl gap-3',
  };

  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && iconPosition === 'left' && <LoadingSpinner />}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
      {loading && iconPosition === 'right' && <LoadingSpinner />}
    </button>
  );
};

export default Button;

<style jsx>{`
  .bg-primary {
    background-color: ${designTokens.colors.primary[500]};
  }
  .bg-primary-600:hover {
    background-color: ${designTokens.colors.primary[600]};
  }
  .bg-primary-700:active {
    background-color: ${designTokens.colors.primary[700]};
  }
  .text-primary {
    color: ${designTokens.colors.primary[500]};
  }
  .border-primary-500 {
    border-color: ${designTokens.colors.primary[500]};
  }
  .bg-primary-50:hover {
    background-color: ${designTokens.colors.primary[50]};
  }
  .bg-primary-100:active {
    background-color: ${designTokens.colors.primary[100]};
  }
  .ring-primary-500:focus {
    --tw-ring-color: ${designTokens.colors.primary[500]};
  }
  
  .bg-accent {
    background-color: ${designTokens.colors.accent[500]};
  }
  .bg-accent-600:hover {
    background-color: ${designTokens.colors.accent[600]};
  }
  .bg-accent-700:active {
    background-color: ${designTokens.colors.accent[700]};
  }
  .ring-accent-500:focus {
    --tw-ring-color: ${designTokens.colors.accent[500]};
  }
`}</style>