import React from 'react';
import { designTokens } from '../../lib/design-tokens';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  rounded?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  rounded = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center font-medium
    transition-colors duration-200
    ${rounded ? 'rounded-full' : 'rounded-md'}
  `;

  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    accent: 'bg-accent-100 text-accent-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  const dotSizeStyles = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {dot && (
        <span
          className={`
            ${dotSizeStyles[size]}
            rounded-full bg-current opacity-60
            ${children ? 'mr-1.5' : ''}
          `}
        />
      )}
      {children}
    </span>
  );
};

// Status Badge Component
export const StatusBadge: React.FC<{
  status: 'active' | 'inactive' | 'pending' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ status, size = 'md', className = '' }) => {
  const statusConfig = {
    active: { variant: 'success' as const, label: 'Active' },
    inactive: { variant: 'default' as const, label: 'Inactive' },
    pending: { variant: 'warning' as const, label: 'Pending' },
    error: { variant: 'error' as const, label: 'Error' },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      size={size}
      dot
      className={className}
    >
      {config.label}
    </Badge>
  );
};

export default Badge;

<style jsx>{`
  .bg-primary-100 {
    background-color: ${designTokens.colors.primary[100]};
  }
  .text-primary-800 {
    color: ${designTokens.colors.primary[800]};
  }
  .bg-accent-100 {
    background-color: ${designTokens.colors.accent[100]};
  }
  .text-accent-800 {
    color: ${designTokens.colors.accent[800]};
  }
`}</style>