'use client';

import React from 'react';
import { CookieConsent, CookieCategory, COOKIE_CATEGORIES } from '@/types/cookies';
import clsx from 'clsx';

interface CookieSettingsProps {
  consent: CookieConsent;
  onUpdateCategory: (category: CookieCategory, value: boolean) => void;
  onSave: () => void;
  onClose: () => void;
}

const CookieSettings: React.FC<CookieSettingsProps> = ({
  consent,
  onUpdateCategory,
  onSave,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full animate-slide-up">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Cookie Preferences
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <p className="text-sm text-gray-600 mb-6">
              We use cookies and similar technologies to help personalize content, tailor and measure ads, 
              and provide a better experience. You can customize your choices below.
            </p>

            <div className="space-y-4">
              {COOKIE_CATEGORIES.map((category) => {
                const categoryKey = category.id as CookieCategory;
                const isChecked = consent[categoryKey];
                const isDisabled = category.required;

                return (
                  <div
                    key={category.id}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-4">
                        <h3 className="font-medium text-foreground mb-1">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isChecked}
                            disabled={isDisabled}
                            onChange={(e) => onUpdateCategory(categoryKey, e.target.checked)}
                          />
                          <div
                            className={clsx(
                              "w-11 h-6 rounded-full peer transition-colors",
                              isDisabled
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-gray-200 peer-checked:bg-primary peer-focus:ring-4 peer-focus:ring-primary/20"
                            )}
                          >
                            <div
                              className={clsx(
                                "absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow transition-transform",
                                isChecked ? "translate-x-5" : "translate-x-0"
                              )}
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                    {isDisabled && (
                      <p className="text-xs text-gray-500 mt-2">
                        These cookies are essential for the website to function properly.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border">
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className={clsx(
                  "px-5 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className={clsx(
                  "px-5 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  "bg-primary text-white hover:bg-primary/90"
                )}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;