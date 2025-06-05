export interface TimeSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  available: boolean;
  duration: number; // in minutes
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  meetingLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AppointmentType = 'strategy-session' | 'consultation' | 'follow-up' | 'other';

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';

export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: string;
  currentChallenges?: string;
  preferredDate: Date;
  preferredTime: string;
  timezone: string;
  notes?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource?: {
    appointment: Appointment;
    type: 'appointment' | 'blocked' | 'available';
  };
}

export interface AvailabilityRule {
  id: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  isActive: boolean;
}

export interface CalendarIntegration {
  id: string;
  provider: 'google' | 'outlook' | 'apple';
  connected: boolean;
  email?: string;
  lastSync?: Date;
}

export interface CalendarSettings {
  timezone: string;
  appointmentDuration: number; // in minutes
  bufferTime: number; // minutes between appointments
  advanceBookingDays: number; // how far in advance can book
  minNoticeHours: number; // minimum notice before booking
  availabilityRules: AvailabilityRule[];
  integrations: CalendarIntegration[];
}