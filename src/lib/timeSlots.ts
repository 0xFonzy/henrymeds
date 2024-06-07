import { isSameDay } from "date-fns";
import { Schedule, TimeSlot } from "../models/Schedule";
import { getNewScheduleDate, getNewTimeSlot } from "./schedule";

/**
 * @description Takes an existing schedule, selected date, and adds a new time slot
 * @dev function can be unit tested and added code coverage
 * @param schedule the previous Schedule
 * @param selectedDate the date to focus on adding new time slots for
 * @returns new Schedule object
 */
export function addTimeSlot(schedule: Schedule, selectedDate: Date): Schedule {
  if (!schedule) return schedule;

  // Check if the selectedDate already exists in the schedule
  const existingDate = schedule.dates.find(date => isSameDay(date.date, selectedDate));

  if (existingDate) {
    // Update the existing date with a new time slot
    const updatedDates = schedule.dates.map(date => {
      if (date.id === existingDate.id) {
        return {
          ...date,
          timeSlots: [...date.timeSlots, getNewTimeSlot(date.date)]
        };
      }
      return date;
    });

    return {
      ...schedule,
      dates: updatedDates
    };
  } else {
    // Add a new date with the new time slot
    const newDate = getNewScheduleDate(selectedDate);
    newDate.timeSlots.push(getNewTimeSlot(selectedDate));

    return {
      ...schedule,
      dates: [...schedule.dates, newDate]
    };
  }
}

/**
 * @description Takes an existing schedule, date id, and time slot index to remove
 * @param schedule the previous Schedule
 * @param dateId the date id for the schedule date
 * @param timeSlotIndex the time slot index for the given date
 * @returns new Schedule object with removed time slot
 */
export function removeTimeSlot(schedule: Schedule, dateId: string, timeSlotIndex: number) {
  if (!schedule) return schedule;

  const updatedDates = schedule.dates.map(scheduleDate => {
    if (scheduleDate.id === dateId) {
      const updatedTimeSlots = scheduleDate.timeSlots.filter((_, i) => i !== timeSlotIndex);
      return {
        ...scheduleDate,
        timeSlots: updatedTimeSlots
      }
    }
    return scheduleDate;
  });

  return {
    ...schedule,
    dates: updatedDates
  }
}

/**
 * @description Takes an existing schedule, date id, time slot index, and updates the time slot start and end dates
 * @param schedule the previous Schedule
 * @param dateId the date id for the schedule date
 * @param timeSlotIndex the time slot index for the given date
 * @param updatedTimeSlot updated time slot object with new start and end dates
 * @returns new Schedule object with updated time slots
 */
export function changeTime(schedule: Schedule, dateId: string, timeSlotIndex: number, updatedTimeSlot: TimeSlot) {
  if (!schedule) return schedule;

  const updatedDates = schedule.dates.map(scheduleDate => {
    if (scheduleDate.id === dateId) {
      const updatedTimeSlots = scheduleDate.timeSlots.map((timeSlot, index) => {
        if (index === timeSlotIndex) {
          return updatedTimeSlot;
        }
        return timeSlot;
      });

      return {
        ...scheduleDate,
        timeSlots: updatedTimeSlots
      };
    }

    return scheduleDate;
  });

  return {
    ...schedule,
    dates: updatedDates
  };
}