'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEmail } from '../../hooks/useEmail';

const leadCaptureSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

type LeadCaptureFormData = z.infer<typeof leadCaptureSchema>;

interface LeadCaptureFormProps {
  resourceId: string;
  resourceName: string;
  downloadUrl: string;
  title?: string;
  description?: string;
  buttonText?: string;
  onSuccess?: () => void;
  className?: string;
}

export function LeadCaptureForm({
  resourceId,
  resourceName,
  downloadUrl,
  title = 'Get Your Free Resource',
  description = 'Enter your details below to receive instant access.',
  buttonText = 'Get Instant Access',
  onSuccess,
  className = '',
}: LeadCaptureFormProps) {
  const { sendResourceDownload, subscribeToNewsletter, loading, error, success } = useEmail();
  const [downloadSent, setDownloadSent] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadCaptureFormData>({
    resolver: zodResolver(leadCaptureSchema),
  });

  const onSubmit = async (data: LeadCaptureFormData) => {
    // First subscribe to newsletter
    await subscribeToNewsletter({
      ...data,
      source: `resource-download-${resourceId}`,
    });

    // Then send the resource download email
    await sendResourceDownload({
      ...data,
      resourceId,
      resourceName,
      downloadUrl,
    });

    setDownloadSent(true);
    
    if (onSuccess) {
      onSuccess();
    }
  };

  if (downloadSent && success) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <div className="mb-4">
          <svg
            className="w-16 h-16 text-green-600 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-green-900 mb-2">Success!</h3>
        <p className="text-green-800 mb-4">
          We've sent {resourceName} to your email address.
        </p>
        <p className="text-sm text-green-700">
          Please check your inbox (and spam folder) for the download link.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 ${className}`}>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            id="lead-name"
            type="text"
            {...register('name')}
            placeholder="John"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="lead-email"
            type="email"
            {...register('email')}
            placeholder="john@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            buttonText
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          We'll also add you to our newsletter for weekly business insights.
          <br />
          Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}