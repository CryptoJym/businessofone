'use client';

import React, { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { CalendarEvent } from '@/types/calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarViewProps {
  events: CalendarEvent[];
  onSelectSlot?: (slotInfo: any) => void;
  onSelectEvent?: (event: CalendarEvent) => void;
  view?: View;
  date?: Date;
  onNavigate?: (date: Date) => void;
  onView?: (view: View) => void;
}

export function CalendarView({
  events,
  onSelectSlot,
  onSelectEvent,
  view = 'week',
  date = new Date(),
  onNavigate,
  onView,
}: CalendarViewProps) {
  const [currentView, setCurrentView] = useState<View>(view);
  const [currentDate, setCurrentDate] = useState(date);

  const handleNavigate = useCallback((newDate: Date) => {
    setCurrentDate(newDate);
    onNavigate?.(newDate);
  }, [onNavigate]);

  const handleViewChange = useCallback((newView: View) => {
    setCurrentView(newView);
    onView?.(newView);
  }, [onView]);

  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    let backgroundColor = '#4169E1'; // Primary color
    let borderColor = '#4169E1';
    
    if (event.resource?.type === 'blocked') {
      backgroundColor = '#E5E7EB';
      borderColor = '#9CA3AF';
    } else if (event.resource?.type === 'available') {
      backgroundColor = '#16A085';
      borderColor = '#16A085';
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        borderRadius: '6px',
        opacity: 0.9,
        color: 'white',
        border: `1px solid ${borderColor}`,
        display: 'block',
      },
    };
  }, []);

  return (
    <div className="h-[600px] bg-white rounded-lg shadow-md p-4">
      <style jsx global>{`
        .rbc-calendar {
          font-family: 'Inter', -apple-system, sans-serif;
        }
        
        .rbc-header {
          padding: 12px;
          font-weight: 600;
          background-color: #F9FAFB;
          border-color: #E5E7EB !important;
        }
        
        .rbc-today {
          background-color: #EEF2FF;
        }
        
        .rbc-off-range-bg {
          background-color: #F9FAFB;
        }
        
        .rbc-button-link {
          color: #4169E1;
        }
        
        .rbc-button-link:hover {
          color: #2F51D9;
        }
        
        .rbc-toolbar button {
          color: #374151;
          border: 1px solid #E5E7EB;
          background-color: white;
          padding: 6px 12px;
          margin: 0 2px;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .rbc-toolbar button:hover {
          background-color: #F3F4F6;
          border-color: #D1D5DB;
        }
        
        .rbc-toolbar button.rbc-active {
          background-color: #4169E1;
          color: white;
          border-color: #4169E1;
        }
        
        .rbc-toolbar button.rbc-active:hover {
          background-color: #2F51D9;
          border-color: #2F51D9;
        }
        
        .rbc-event {
          padding: 4px 8px;
          font-size: 0.875rem;
        }
        
        .rbc-time-slot {
          min-height: 60px;
        }
        
        .rbc-timeslot-group {
          min-height: 60px;
        }
      `}</style>
      
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={onSelectSlot}
        onSelectEvent={onSelectEvent}
        view={currentView}
        date={currentDate}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        selectable
        eventPropGetter={eventStyleGetter}
        views={['month', 'week', 'day']}
        defaultView="week"
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 19, 0, 0)}
      />
    </div>
  );
}