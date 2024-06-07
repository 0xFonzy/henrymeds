import { add, isAfter } from "date-fns";
import { TimeSlot } from "../models/Schedule";

/**
 * @description Given an array of time slots and minutes generate all of the micro time slot intervals
 * @param timeSlots array of time slots
 * @param minutes minute intervals i.e. 15 minutes in 1pm-2pm range will be 1:00pm, 1:15pm, 1:30pm, 1:45pm, 2:00pm
 * @returns date array of provided minute intervals
 */
export function getTimeSlotIntervals(timeSlots: TimeSlot[], minutes: number): Date[] {
  return timeSlots.reduce<Date[]>((acc, timeSlot) => {
    const {start, end} = timeSlot;
    let currentTime = new Date(start);

    while (currentTime <= end) {
      acc.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + minutes);
    }

    return acc;
  }, []);
}

/**
 * @description Given a date time returns true if date is after specified hours, false otherwise
 * @param time date time to compare
 * @param hours hours in the future
 * @returns true if time is ahead of {hours} in the future
 */
export function isFutureTime(time: Date, hours: number) {
  const futureDate = add(new Date(), { hours: hours });
  return isAfter(time, futureDate);
}

/**
 * @description Filters all time slots that are not at least x hours from now
 * @param timeSlots the time slots array
 * @param hours number of hours in the future to filter by
 * @returns filtered array of time slots in the future 
 */
export function getFutureTimeSlots(timeSlots: TimeSlot[], hours: number): TimeSlot[] {
  return timeSlots.filter(timeSlot => isFutureTime(timeSlot.start, hours));
}
