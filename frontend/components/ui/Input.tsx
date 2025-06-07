import React, { forwardRef } from 'react';
import { designTokens } from '../../lib/design-tokens';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'underline';
  inputSize?: 'sm' | 'md' | 'lg';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      variant = 'default',
      inputSize = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const baseInputStyles = `
      w-full transition-all duration-200
      placeholder:text-gray-400
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none
    `;

    const variantStyles = {
      default: `
        border rounded-lg
        ${error 
          ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
          : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
        }
      `,
      filled: `
        bg-gray-50 border-0 rounded-lg
        ${error
          ? 'ring-2 ring-red-500 focus:ring-red-500'
          : 'hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary-500'
        }
      `,
      underline: `
        border-0 border-b-2 rounded-none px-0
        ${error
          ? 'border-red-500 focus:border-red-600'
          : 'border-gray-300 focus:border-primary-500'
        }
      `,
    };

    const sizeStyles = {
      sm: {
        input: 'text-sm py-1.5',
        padding: leftIcon ? 'pl-9 pr-3' : rightIcon ? 'pl-3 pr-9' : 'px-3',
        icon: 'h-4 w-4',
      },
      md: {
        input: 'text-base py-2',
        padding: leftIcon ? 'pl-10 pr-4' : rightIcon ? 'pl-4 pr-10' : 'px-4',
        icon: 'h-5 w-5',
      },
      lg: {
        input: 'text-lg py-3',
        padding: leftIcon ? 'pl-12 pr-5' : rightIcon ? 'pl-5 pr-12' : 'px-5',
        icon: 'h-6 w-6',
      },
    };

    const currentSize = sizeStyles[inputSize];

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 ${currentSize.icon}`}>
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={`
              ${baseInputStyles}
              ${variantStyles[variant]}
              ${currentSize.input}
              ${currentSize.padding}
              ${className}
            `}
            {...props}
          />
          
          {rightIcon && (
            <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 ${currentSize.icon}`}>
              {rightIcon}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
        
        {hint && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea Component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  variant?: 'default' | 'filled';
  textareaSize?: 'sm' | 'md' | 'lg';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      variant = 'default',
      textareaSize = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      w-full transition-all duration-200
      placeholder:text-gray-400
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none resize-y min-h-[100px]
    `;

    const variantStyles = {
      default: `
        border rounded-lg
        ${error 
          ? 'border-red-500 focus:ring-2 focus:ring-red-200' 
          : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
        }
      `,
      filled: `
        bg-gray-50 border-0 rounded-lg
        ${error
          ? 'ring-2 ring-red-500 focus:ring-red-500'
          : 'hover:bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary-500'
        }
      `,
    };

    const sizeStyles = {
      sm: 'text-sm p-2.5',
      md: 'text-base p-3',
      lg: 'text-lg p-4',
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={`
            ${baseStyles}
            ${variantStyles[variant]}
            ${sizeStyles[textareaSize]}
            ${className}
          `}
          {...props}
        />
        
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
        
        {hint && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Input;

<style jsx>{`
  .border-primary-500:focus {
    border-color: ${designTokens.colors.primary[500]};
  }
  .ring-primary-200:focus {
    --tw-ring-color: ${designTokens.colors.primary[200]};
  }
  .ring-primary-500:focus {
    --tw-ring-color: ${designTokens.colors.primary[500]};
  }
`}</style>