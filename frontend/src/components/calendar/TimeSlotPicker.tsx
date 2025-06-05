'use client';

import React, { useState } from 'react';
import { format, addDays, isToday, isTomorrow } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { TimeSlot, AvailabilityRule, Appointment } from '@/types/calendar';
import { generateTimeSlots, formatTimeSlot } from '@/utils/calendar';

interface TimeSlotPickerProps {
  availabilityRules: AvailabilityRule[];
  existingAppointments: Appointment[];
  onSelectSlot: (date: Date, time: string) => void;
  minDate?: Date;
  maxDate?: Date;
  duration?: number;
  bufferTime?: number;
}

export function TimeSlotPicker({
  availabilityRules,
  existingAppointments,
  onSelectSlot,
  minDate = new Date(),
  maxDate = addDays(new Date(), 30),
  duration = 60,
  bufferTime = 15,
}: TimeSlotPickerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'calendar'>('week');

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM d');
  };

  const timeSlots = generateTimeSlots(
    selectedDate,
    availabilityRules,
    existingAppointments,
    duration,
    bufferTime
  );

  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(minDate, i));

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePreviousWeek = () => {
    const newDate = addDays(selectedDate, -7);
    if (newDate >= minDate) {
      setSelectedDate(newDate);
    }
  };

  const handleNextWeek = () => {
    const newDate = addDays(selectedDate, 7);
    if (newDate <= maxDate) {
      setSelectedDate(newDate);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Select a Time</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost" as any
              size="sm"
              onClick={() => setViewMode(viewMode === 'week' ? 'calendar' : 'week')}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'week' ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost" as any
                size="sm"
                onClick={handlePreviousWeek}
                disabled={selectedDate <= minDate}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium text-gray-700">
                {format(weekDates[0], 'MMM d')} - {format(weekDates[6], 'MMM d, yyyy')}
              </span>
              <Button
                variant="ghost" as any
                size="sm"
                onClick={handleNextWeek}
                disabled={addDays(selectedDate, 7) > maxDate}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {weekDates.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => handleDateSelect(date)}
                  className={`
                    py-2 px-1 text-center rounded-md transition-colors
                    ${selectedDate.toDateString() === date.toDateString()
                      ? 'bg-primary text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  <div className="text-xs font-medium">{format(date, 'EEE')}</div>
                  <div className="text-sm">{format(date, 'd')}</div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="mb-4">
            {/* Calendar view would go here */}
            <p className="text-gray-500 text-center py-8">Calendar view coming soon</p>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Available times for {getDateLabel(selectedDate)}
          </h4>
          
          {timeSlots.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No available time slots for this date</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && onSelectSlot(selectedDate, slot.startTime)}
                  disabled={!slot.available}
                  className={`
                    py-2 px-3 text-sm rounded-md transition-colors
                    ${slot.available
                      ? 'bg-accent-50 hover:bg-accent-100 text-accent-700 border border-accent-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {formatTimeSlot(slot)}
                </button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}