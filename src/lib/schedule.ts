import { ScheduleDate, TimeSlot } from "../models/Schedule";

export function getNewScheduleDate(date: Date) {
  const newScheduleDate: ScheduleDate = {
    id: '',
    date: date,
    timeSlots: []
  };
  return newScheduleDate;
}

export function getNewTimeSlot(date: Date) {
  const newTimeSlot: TimeSlot = {
    start: new Date(date),
    end: new Date(date)
  };
  return newTimeSlot;
}