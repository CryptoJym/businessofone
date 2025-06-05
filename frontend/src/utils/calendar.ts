import { format, addMinutes, startOfDay, endOfDay, isAfter, isBefore, addDays, startOfWeek, endOfWeek, eachDayOfInterval, setHours, setMinutes, parseISO } from 'date-fns';
import { TimeSlot, AvailabilityRule, Appointment } from '@/types/calendar';

export function generateTimeSlots(
  date: Date,
  availabilityRules: AvailabilityRule[],
  existingAppointments: Appointment[],
  duration: number = 60,
  bufferTime: number = 15
): TimeSlot[] {
  const dayOfWeek = date.getDay();
  const dayRules = availabilityRules.filter(rule => rule.dayOfWeek === dayOfWeek && rule.isActive);
  
  if (dayRules.length === 0) {
    return [];
  }

  const slots: TimeSlot[] = [];
  
  dayRules.forEach(rule => {
    const [startHour, startMinute] = rule.startTime.split(':').map(Number);
    const [endHour, endMinute] = rule.endTime.split(':').map(Number);
    
    let currentTime = setMinutes(setHours(date, startHour), startMinute);
    const endTime = setMinutes(setHours(date, endHour), endMinute);
    
    while (isBefore(currentTime, endTime)) {
      const slotEnd = addMinutes(currentTime, duration);
      
      if (isAfter(slotEnd, endTime)) {
        break;
      }
      
      const isAvailable = !existingAppointments.some(apt => {
        const aptStart = parseISO(`${format(apt.date, 'yyyy-MM-dd')}T${apt.startTime}`);
        const aptEnd = parseISO(`${format(apt.date, 'yyyy-MM-dd')}T${apt.endTime}`);
        const slotStart = currentTime;
        
        return (
          (isAfter(slotStart, aptStart) && isBefore(slotStart, aptEnd)) ||
          (isAfter(slotEnd, aptStart) && isBefore(slotEnd, aptEnd)) ||
          (isBefore(slotStart, aptStart) && isAfter(slotEnd, aptEnd))
        );
      });
      
      slots.push({
        id: `${format(date, 'yyyy-MM-dd')}-${format(currentTime, 'HH:mm')}`,
        date,
        startTime: format(currentTime, 'HH:mm'),
        endTime: format(slotEnd, 'HH:mm'),
        available: isAvailable,
        duration
      });
      
      currentTime = addMinutes(slotEnd, bufferTime);
    }
  });
  
  return slots;
}

export function getWeekDates(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(date, { weekStartsOn: 1 });
  return eachDayOfInterval({ start, end });
}

export function formatTimeSlot(slot: TimeSlot): string {
  return `${slot.startTime} - ${slot.endTime}`;
}

export function formatAppointmentDate(date: Date): string {
  return format(date, 'EEEE, MMMM d, yyyy');
}

export function getAvailableDates(
  startDate: Date,
  endDate: Date,
  availabilityRules: AvailabilityRule[]
): Date[] {
  const dates = eachDayOfInterval({ start: startDate, end: endDate });
  return dates.filter(date => {
    const dayOfWeek = date.getDay();
    return availabilityRules.some(rule => rule.dayOfWeek === dayOfWeek && rule.isActive);
  });
}

export function isValidBookingTime(
  date: Date,
  time: string,
  minNoticeHours: number
): boolean {
  const [hours, minutes] = time.split(':').map(Number);
  const bookingTime = setMinutes(setHours(date, hours), minutes);
  const minTime = addMinutes(new Date(), minNoticeHours * 60);
  
  return isAfter(bookingTime, minTime);
}

export const defaultAvailabilityRules: AvailabilityRule[] = [
  { id: '1', dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isActive: true }, // Monday
  { id: '2', dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isActive: true }, // Tuesday
  { id: '3', dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isActive: true }, // Wednesday
  { id: '4', dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isActive: true }, // Thursday
  { id: '5', dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isActive: true }, // Friday
  { id: '6', dayOfWeek: 6, startTime: '10:00', endTime: '14:00', isActive: false }, // Saturday
  { id: '7', dayOfWeek: 0, startTime: '10:00', endTime: '14:00', isActive: false }, // Sunday
];