'use client';

import React from 'react';
import { useSkipLinks } from '@/src/hooks/useA11y';
import { zIndex } from '@/src/styles/design-system';

export function SkipLinks() {
  const skipLinks = useSkipLinks();
  
  if (skipLinks.length === 0) return null;
  
  return (
    <nav aria-label="Skip links" className="skip-links">
      {skipLinks.map(link => (
        <a
          key={link.id}
          href={link.target}
          className="skip-link"
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector(link.target);
            if (target) {
              (target as HTMLElement).focus();
              target.scrollIntoView();
            }
          }}
        >
          {link.label}
        </a>
      ))}
      <style jsx>{`
        .skip-links {
          position: absolute;
          top: 0;
          left: 0;
          z-index: ${zIndex.skipLink};
        }
        
        .skip-link {
          position: absolute;
          left: -10000px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
          background: var(--color-primary-500);
          color: white;
          padding: 1rem 2rem;
          text-decoration: none;
          border-radius: 0 0 0.5rem 0;
          font-weight: 600;
        }
        
        .skip-link:focus {
          position: absolute;
          left: 0;
          top: 0;
          width: auto;
          height: auto;
          overflow: visible;
          outline: 3px solid var(--color-primary-700);
          outline-offset: 2px;
        }
      `}</style>
    </nav>
  );
}