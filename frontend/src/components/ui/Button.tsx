'use client';

import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { colors, spacing, borders, typography, focus, shadows } from '@/src/styles/design-system';
import { useAnnounce } from '@/src/hooks/useA11y';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      disabled,
      onClick,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const { announceAssertive } = useAnnounce();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        e.preventDefault();
        return;
      }
      
      // Announce button action for screen readers
      if (typeof children === 'string') {
        announceAssertive(`${children} activated`);
      }
      
      onClick?.(e);
    };
    
    const getVariantStyles = () => {
      const styles = {
        primary: {
          background: colors.primary[500],
          color: 'white',
          border: undefined as string | undefined,
          hoverBg: colors.primary[600],
          activeBg: colors.primary[700],
          disabledBg: colors.neutral[300],
        },
        secondary: {
          background: 'white',
          color: colors.primary[600],
          border: `1px solid ${colors.primary[200]}`,
          hoverBg: colors.primary[50],
          activeBg: colors.primary[100],
          disabledBg: colors.neutral[100],
        },
        ghost: {
          background: 'transparent',
          color: colors.primary[600],
          border: undefined as string | undefined,
          hoverBg: colors.primary[50],
          activeBg: colors.primary[100],
          disabledBg: 'transparent',
        },
        danger: {
          background: colors.error.light,
          color: colors.error.contrast,
          border: undefined as string | undefined,
          hoverBg: colors.error.dark,
          activeBg: colors.neutral[900],
          disabledBg: colors.neutral[300],
        },
      };
      
      return styles[variant];
    };
    
    const getSizeStyles = () => {
      const styles = {
        sm: {
          padding: `${spacing[2]} ${spacing[3]}`,
          fontSize: typography.sizes.sm.base,
          lineHeight: typography.sizes.sm.lineHeight,
        },
        md: {
          padding: `${spacing[3]} ${spacing[4]}`,
          fontSize: typography.sizes.base.base,
          lineHeight: typography.sizes.base.lineHeight,
        },
        lg: {
          padding: `${spacing[4]} ${spacing[6]}`,
          fontSize: typography.sizes.lg.base,
          lineHeight: typography.sizes.lg.lineHeight,
        },
      };
      
      return styles[size];
    };
    
    const variantStyles = getVariantStyles();
    const sizeStyles = getSizeStyles();
    const isDisabled = disabled || loading;
    
    return (
      <>
        <button
          ref={ref}
          className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${className}`}
          disabled={isDisabled}
          onClick={handleClick}
          aria-busy={loading}
          aria-disabled={isDisabled}
          {...props}
        >
          {loading && (
            <span className="btn-spinner" aria-label="Loading">
              <svg className="spinner" viewBox="0 0 24 24" aria-hidden="true">
                <circle
                  className="spinner-track"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="3"
                  fill="none"
                />
                <circle
                  className="spinner-fill"
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="31.415 31.415"
                  strokeDashoffset="23.561"
                />
              </svg>
            </span>
          )}
          {icon && iconPosition === 'left' && !loading && (
            <span className="btn-icon btn-icon-left" aria-hidden="true">
              {icon}
            </span>
          )}
          <span className="btn-text">{children}</span>
          {icon && iconPosition === 'right' && !loading && (
            <span className="btn-icon btn-icon-right" aria-hidden="true">
              {icon}
            </span>
          )}
        </button>
        
        <style jsx>{`
          .btn {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: ${spacing[2]};
            font-family: ${typography.fonts.sans};
            font-weight: ${typography.weights.medium};
            border-radius: ${borders.radius.md};
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            border: none;
            white-space: nowrap;
            user-select: none;
            
            /* Size styles */
            padding: ${sizeStyles.padding};
            font-size: ${sizeStyles.fontSize};
            line-height: ${sizeStyles.lineHeight};
            
            /* Variant styles */
            background: ${variantStyles.background};
            color: ${variantStyles.color};
            ${variantStyles.border ? `border: ${variantStyles.border};` : ''}
          }
          
          .btn:hover:not(:disabled) {
            background: ${variantStyles.hoverBg};
            transform: translateY(-1px);
            box-shadow: ${shadows.md};
          }
          
          .btn:active:not(:disabled) {
            background: ${variantStyles.activeBg};
            transform: translateY(0);
            box-shadow: ${shadows.sm};
          }
          
          .btn:focus-visible {
            outline: ${focus.ring.width} ${focus.ring.style} ${focus.ring.color};
            outline-offset: ${focus.ring.offset};
          }
          
          .btn:disabled {
            cursor: not-allowed;
            opacity: 0.6;
            background: ${variantStyles.disabledBg};
            transform: none;
            box-shadow: none;
          }
          
          .btn-full {
            width: 100%;
          }
          
          .btn-spinner {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: inherit;
            border-radius: inherit;
          }
          
          .spinner {
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
          }
          
          .spinner-track {
            stroke: currentColor;
            opacity: 0.25;
          }
          
          .spinner-fill {
            stroke: currentColor;
            stroke-linecap: round;
            animation: spinner-dash 1.5s ease-in-out infinite;
          }
          
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes spinner-dash {
            0% {
              stroke-dasharray: 1 62.83;
              stroke-dashoffset: 0;
            }
            50% {
              stroke-dasharray: 47.12 15.71;
              stroke-dashoffset: -15.71;
            }
            100% {
              stroke-dasharray: 1 62.83;
              stroke-dashoffset: -62.83;
            }
          }
          
          .btn-text {
            opacity: ${loading ? 0 : 1};
          }
          
          .btn-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 1.25em;
            height: 1.25em;
          }
          
          /* Dark mode */
          [data-color-scheme="dark"] .btn-primary {
            background: ${colors.primary[400]};
          }
          
          [data-color-scheme="dark"] .btn-primary:hover:not(:disabled) {
            background: ${colors.primary[500]};
          }
          
          [data-color-scheme="dark"] .btn-secondary {
            background: ${colors.neutral[800]};
            color: ${colors.neutral[100]};
            border-color: ${colors.neutral[600]};
          }
          
          [data-color-scheme="dark"] .btn-secondary:hover:not(:disabled) {
            background: ${colors.neutral[700]};
          }
          
          /* High contrast mode */
          [data-color-scheme="high-contrast"] .btn {
            border: 2px solid ${colors.highContrast.border};
          }
          
          [data-color-scheme="high-contrast"] .btn-primary {
            background: ${colors.highContrast.primary};
            color: ${colors.highContrast.background};
          }
          
          [data-color-scheme="high-contrast"] .btn:focus-visible {
            outline: ${focus.highContrastRing.width} ${focus.highContrastRing.style} ${focus.highContrastRing.color};
            outline-offset: ${focus.highContrastRing.offset};
          }
          
          /* Reduced motion */
          [data-motion="reduced"] .btn {
            transition: none;
          }
          
          [data-motion="reduced"] .btn:hover:not(:disabled) {
            transform: none;
          }
          
          [data-motion="reduced"] .spinner {
            animation: none;
          }
          
          [data-motion="reduced"] .spinner-fill {
            animation: none;
            opacity: 0.75;
          }
        `}</style>
      </>
    );
  }
);

Button.displayName = 'Button';