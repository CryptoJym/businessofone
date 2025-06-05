import React from 'react';
import { designTokens } from '../../lib/design-tokens';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  clickable?: boolean;
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  as: Component = 'div',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = `
    relative overflow-hidden
    transition-all duration-200
    ${clickable ? 'cursor-pointer' : ''}
  `;

  const variantStyles = {
    default: `
      bg-white border border-gray-200
      ${hoverable ? 'hover:shadow-md hover:border-gray-300' : ''}
    `,
    elevated: `
      bg-white shadow-lg
      ${hoverable ? 'hover:shadow-xl hover:translate-y-[-2px]' : ''}
    `,
    outlined: `
      bg-transparent border-2 border-gray-300
      ${hoverable ? 'hover:border-primary-500 hover:shadow-sm' : ''}
    `,
    filled: `
      bg-gray-50 border border-gray-100
      ${hoverable ? 'hover:bg-gray-100 hover:border-gray-200' : ''}
    `,
  };

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10',
  };

  return (
    <Component
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        rounded-xl
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

// Card Header Component
export const CardHeader: React.FC<{
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}> = ({ title, subtitle, action, className = '', children }) => {
  if (children) {
    return <div className={`mb-4 ${className}`}>{children}</div>;
  }

  return (
    <div className={`flex items-start justify-between mb-4 ${className}`}>
      <div>
        {title && <h3 className="text-xl font-semibold text-gray-900">{title}</h3>}
        {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
};

// Card Body Component
export const CardBody: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => {
  return <div className={`${className}`}>{children}</div>;
};

// Card Footer Component
export const CardFooter: React.FC<{
  className?: string;
  children: React.ReactNode;
  divider?: boolean;
}> = ({ className = '', children, divider = true }) => {
  return (
    <div
      className={`
        mt-6
        ${divider ? 'pt-4 border-t border-gray-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;

<style jsx>{`
  .bg-white {
    background-color: ${designTokens.colors.background.primary};
  }
  .bg-gray-50 {
    background-color: ${designTokens.colors.gray[50]};
  }
  .bg-gray-100:hover {
    background-color: ${designTokens.colors.gray[100]};
  }
  .border-gray-100 {
    border-color: ${designTokens.colors.gray[100]};
  }
  .border-gray-200 {
    border-color: ${designTokens.colors.gray[200]};
  }
  .border-gray-300 {
    border-color: ${designTokens.colors.gray[300]};
  }
  .border-primary-500:hover {
    border-color: ${designTokens.colors.primary[500]};
  }
  .text-gray-900 {
    color: ${designTokens.colors.gray[900]};
  }
  .text-gray-600 {
    color: ${designTokens.colors.gray[600]};
  }
`}</style>