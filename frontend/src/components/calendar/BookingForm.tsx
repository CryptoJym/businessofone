'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { BookingFormData } from '@/types/calendar';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  businessType: z.string().optional(),
  currentChallenges: z.string().min(10, 'Please describe your challenges (at least 10 characters)'),
  notes: z.string().optional(),
});

type BookingFormSchema = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  selectedDate: Date;
  selectedTime: string;
  onSubmit: (data: BookingFormData) => void;
  onCancel: () => void;
}

export function BookingForm({ selectedDate, selectedTime, onSubmit, onCancel }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingSchema),
  });

  const handleFormSubmit = (data: BookingFormSchema) => {
    const bookingData: BookingFormData = {
      ...data,
      preferredDate: selectedDate,
      preferredTime: selectedTime,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    onSubmit(bookingData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Book Your Free Strategy Session</CardTitle>
        <p className="text-gray-600 mt-2">
          Selected time: <strong>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</strong> at <strong>{selectedTime}</strong>
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-error">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="company"
                {...register('company')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Acme Corp"
              />
            </div>
          </div>

          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
              Type of Business
            </label>
            <select
              id="businessType"
              {...register('businessType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select your business type</option>
              <option value="consulting">Consulting</option>
              <option value="ecommerce">E-commerce</option>
              <option value="saas">SaaS</option>
              <option value="agency">Agency</option>
              <option value="freelance">Freelance</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="currentChallenges" className="block text-sm font-medium text-gray-700 mb-1">
              Current Business Challenges *
            </label>
            <textarea
              id="currentChallenges"
              {...register('currentChallenges')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Tell us about your main business challenges..."
            />
            {errors.currentChallenges && (
              <p className="mt-1 text-sm text-error">{errors.currentChallenges.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Anything else you'd like us to know?"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              loading={isSubmitting}
              className="flex-1"
            >
              Book Session
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}