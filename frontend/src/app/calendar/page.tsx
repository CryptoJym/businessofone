'use client';

import React, { useState } from 'react';
import { format, addMinutes, parseISO } from 'date-fns';
import { CalendarView } from '@/components/calendar/CalendarView';
import { TimeSlotPicker } from '@/components/calendar/TimeSlotPicker';
import { BookingForm } from '@/components/calendar/BookingForm';
import { CalendarEvent, BookingFormData, Appointment } from '@/types/calendar';
import { defaultAvailabilityRules } from '@/utils/calendar';

export default function CalendarPage() {
  const [step, setStep] = useState<'select-time' | 'booking-form' | 'confirmation'>('select-time');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleSlotSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep('booking-form');
  };

  const handleBookingSubmit = async (data: BookingFormData) => {
    // Here you would typically send the booking data to your API
    console.log('Booking submitted:', data);
    
    // For now, we'll just create a mock appointment
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      clientName: data.name,
      clientEmail: data.email,
      clientPhone: data.phone,
      date: data.preferredDate,
      startTime: data.preferredTime,
      endTime: format(addMinutes(parseISO(`2024-01-01T${data.preferredTime}`), 60), 'HH:mm'),
      type: 'strategy-session',
      status: 'confirmed',
      notes: data.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setAppointments([...appointments, newAppointment]);
    setStep('confirmation');
  };

  const handleCancel = () => {
    setStep('select-time');
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Convert appointments to calendar events
  const calendarEvents: CalendarEvent[] = appointments.map(apt => ({
    id: apt.id,
    title: `${apt.clientName} - ${apt.type}`,
    start: parseISO(`${format(apt.date, 'yyyy-MM-dd')}T${apt.startTime}`),
    end: parseISO(`${format(apt.date, 'yyyy-MM-dd')}T${apt.endTime}`),
    resource: {
      appointment: apt,
      type: 'appointment'
    }
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Schedule Your Free Strategy Session
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book a 60-minute consultation to transform your business. 
            We'll analyze your challenges and create a personalized growth strategy.
          </p>
        </div>

        {step === 'select-time' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <TimeSlotPicker
                availabilityRules={defaultAvailabilityRules}
                existingAppointments={appointments}
                onSelectSlot={handleSlotSelect}
              />
            </div>
            <div>
              <CalendarView
                events={calendarEvents}
                view="week"
                onSelectEvent={(event) => console.log('Event selected:', event)}
              />
            </div>
          </div>
        )}

        {step === 'booking-form' && selectedDate && selectedTime && (
          <BookingForm
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSubmit={handleBookingSubmit}
            onCancel={handleCancel}
          />
        )}

        {step === 'confirmation' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Session is Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                We've sent a confirmation email with all the details. 
                Looking forward to helping you transform your business!
              </p>
              <div className="bg-gray-50 rounded-md p-4 mb-6">
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong> {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Time:</strong> {selectedTime}
                </p>
              </div>
              <button
                onClick={() => {
                  setStep('select-time');
                  setSelectedDate(null);
                  setSelectedTime(null);
                }}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Book Another Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}