import { getNewScheduleDate, getNewTimeSlot } from '../lib/schedule';
import { ScheduleDate, TimeSlot } from '../models/Schedule';

describe('getNewScheduleDate', () => {
  it('should return a new ScheduleDate object with the provided date', () => {
    const date = new Date('2023-06-15');
    const newScheduleDate = getNewScheduleDate(date);

    const expectedScheduleDate: ScheduleDate = {
      id: '',
      date: date,
      timeSlots: []
    };

    expect(newScheduleDate).toEqual(expectedScheduleDate);
  });

  it('should return a ScheduleDate object with an empty id', () => {
    const date = new Date('2023-06-15');
    const newScheduleDate = getNewScheduleDate(date);

    expect(newScheduleDate.id).toBe('');
  });

  it('should return a ScheduleDate object with an empty timeSlots array', () => {
    const date = new Date('2023-06-15');
    const newScheduleDate = getNewScheduleDate(date);

    expect(newScheduleDate.timeSlots).toEqual([]);
  });
});

describe('getNewTimeSlot', () => {
  it('should return a new TimeSlot object with the provided date', () => {
    const date = new Date('2023-06-15');
    const newTimeSlot = getNewTimeSlot(date);

    const expectedTimeSlot: TimeSlot = {
      start: new Date(date),
      end: new Date(date)
    };

    expect(newTimeSlot).toEqual(expectedTimeSlot);
  });

  it('should return a TimeSlot object with the start date set to the provided date', () => {
    const date = new Date('2023-06-15');
    const newTimeSlot = getNewTimeSlot(date);

    expect(newTimeSlot.start).toEqual(date);
  });

  it('should return a TimeSlot object with the end date set to the provided date', () => {
    const date = new Date('2023-06-15');
    const newTimeSlot = getNewTimeSlot(date);

    expect(newTimeSlot.end).toEqual(date);
  });
});
