import { addTimeSlot, changeTime, removeTimeSlot } from '../lib/timeSlots'
import { Schedule, ScheduleDate, TimeSlot } from '../models/Schedule';
import { isSameDay } from 'date-fns';
import { getNewTimeSlot, getNewScheduleDate } from '../lib/schedule';

// Mock dependencies
jest.mock('date-fns', () => ({
  isSameDay: jest.fn(),
}));

jest.mock('../lib/schedule', () => ({
  getNewTimeSlot: jest.fn(),
  getNewScheduleDate: jest.fn(),
}));

describe('addTimeSlot', () => {
  const mockIsSameDay = isSameDay as jest.Mock;
  const mockGetNewTimeSlot = getNewTimeSlot as jest.Mock;
  const mockGetNewScheduleDate = getNewScheduleDate as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new time slot to an existing date', () => {
    const selectedDate = new Date('2023-06-10');
    const existingDate: ScheduleDate = {
      id: '1',
      date: new Date('2023-06-10'),
      timeSlots: [],
    };
    const schedule: Schedule = {
      providerId: 'provider1',
      providerName: "Michelle Deflorimonte",
      providerTitle: "NP",
      dates: [existingDate],
    };

    mockIsSameDay.mockImplementation((date1, date2) => date1.getTime() === date2.getTime());
    const newTimeSlot = { start: new Date('2023-06-10T10:00:00'), end: new Date('2023-06-10T11:00:00') };
    mockGetNewTimeSlot.mockReturnValue(newTimeSlot);

    const updatedSchedule = addTimeSlot(schedule, selectedDate);

    expect(updatedSchedule.dates[0].timeSlots).toContain(newTimeSlot);
  });

  it('should add a new date with a time slot if the date does not exist', () => {
    const selectedDate = new Date('2023-06-12');
    const existingDate: ScheduleDate = {
      id: '1',
      date: new Date('2023-06-10'),
      timeSlots: [],
    };
    const schedule: Schedule = {
      providerId: 'provider1',
      providerName: "Michelle Deflorimonte",
      providerTitle: "NP",
      dates: [existingDate],
    };

    mockIsSameDay.mockImplementation((date1, date2) => date1.getTime() === date2.getTime());
    const newTimeSlot = { start: new Date('2023-06-12T10:00:00'), end: new Date('2023-06-12T11:00:00') };
    const newScheduleDate: ScheduleDate = {
      id: '2',
      date: selectedDate,
      timeSlots: [],
    };

    mockGetNewTimeSlot.mockReturnValue(newTimeSlot);
    mockGetNewScheduleDate.mockReturnValue(newScheduleDate);

    const updatedSchedule = addTimeSlot(schedule, selectedDate);

    expect(updatedSchedule.dates).toHaveLength(2);
    expect(updatedSchedule.dates[1].date).toEqual(selectedDate);
    expect(updatedSchedule.dates[1].timeSlots).toContain(newTimeSlot);
  });
});

describe('removeTimeSlot', () => {
  it('should remove a time slot from an existing date', () => {
    const schedule: Schedule = {
      providerId: 'provider1',
      providerName: "Michelle Deflorimonte",
      providerTitle: "NP",
      dates: [
        {
          id: '1',
          date: new Date('2023-06-10'),
          timeSlots: [
            { start: new Date('2023-06-10T09:00:00'), end: new Date('2023-06-10T10:00:00') },
            { start: new Date('2023-06-10T10:00:00'), end: new Date('2023-06-10T11:00:00') },
          ],
        },
      ],
    };
    const dateId = '1';
    const timeSlotIndex = 0;

    const updatedSchedule = removeTimeSlot(schedule, dateId, timeSlotIndex);

    expect(updatedSchedule.dates[0].timeSlots).toHaveLength(1);
    expect(updatedSchedule.dates[0].timeSlots[0]).toEqual({ start: new Date('2023-06-10T10:00:00'), end: new Date('2023-06-10T11:00:00') });
  });

  it('should handle invalid dateId gracefully', () => {
    const schedule: Schedule = {
      providerId: 'provider1',
      providerName: "Michelle Deflorimonte",
      providerTitle: "NP",
      dates: [
        {
          id: '1',
          date: new Date('2023-06-10'),
          timeSlots: [
            { start: new Date('2023-06-10T09:00:00'), end: new Date('2023-06-10T10:00:00') },
          ],
        },
      ],
    };
    const dateId = 'invalid_id';
    const timeSlotIndex = 0;

    const updatedSchedule = removeTimeSlot(schedule, dateId, timeSlotIndex);

    expect(updatedSchedule).toEqual(schedule);
  });

  it('should handle invalid timeSlotIndex gracefully', () => {
    const schedule: Schedule = {
      providerId: 'provider1',
      providerName: "Michelle Deflorimonte",
      providerTitle: "NP",
      dates: [
        {
          id: '1',
          date: new Date('2023-06-10'),
          timeSlots: [
            { start: new Date('2023-06-10T09:00:00'), end: new Date('2023-06-10T10:00:00') },
          ],
        },
      ],
    };
    const dateId = '1';
    const timeSlotIndex = 10;

    const updatedSchedule = removeTimeSlot(schedule, dateId, timeSlotIndex);

    expect(updatedSchedule).toEqual(schedule);
  });
});

describe('changeTime', () => {
  it('should update a time slot in an existing date', () => {
    const schedule: Schedule = {
      providerId: 'provider1',
      providerName: "Michelle Deflorimonte",
      providerTitle: "NP",
      dates: [
        {
          id: '1',
          date: new Date('2023-06-10'),
          timeSlots: [
            { start: new Date('2023-06-10T09:00:00'), end: new Date('2023-06-10T10:00:00') },
            { start: new Date('2023-06-10T10:00:00'), end: new Date('2023-06-10T11:00:00') },
          ],
        },
      ],
    };
    const dateId = '1';
    const timeSlotIndex = 1;
    const updatedTimeSlot: TimeSlot = { start: new Date('2023-06-10T11:00:00'), end: new Date('2023-06-10T12:00:00') };

    const updatedSchedule = changeTime(schedule, dateId, timeSlotIndex, updatedTimeSlot);

    expect(updatedSchedule.dates[0].timeSlots[timeSlotIndex]).toEqual(updatedTimeSlot);
  });

  it('should handle invalid dateId gracefully', () => {
    const schedule: Schedule = {
      providerId: 'provider1',
      providerName: "Michelle Deflorimonte",
      providerTitle: "NP",
      dates: [
        {
          id: '1',
          date: new Date('2023-06-10'),
          timeSlots: [
            { start: new Date('2023-06-10T09:00:00'), end: new Date('2023-06-10T10:00:00') },
          ],
        },
      ],
    };
    const dateId = 'invalid_id';
    const timeSlotIndex = 0;
    const updatedTimeSlot: TimeSlot = { start: new Date('2023-06-10T11:00:00'), end: new Date('2023-06-10T12:00:00') };

    const updatedSchedule = changeTime(schedule, dateId, timeSlotIndex, updatedTimeSlot);

    expect(updatedSchedule).toEqual(schedule);
  });

  it('should handle invalid timeSlotIndex gracefully', () => {
    const schedule: Schedule = {
      providerId: 'provider1',
      providerName: "Michelle Deflorimonte",
      providerTitle: "NP",
      dates: [
        {
          id: '1',
          date: new Date('2023-06-10'),
          timeSlots: [
            { start: new Date('2023-06-10T09:00:00'), end: new Date('2023-06-10T10:00:00') },
          ],
        },
      ],
    };
    const dateId = '1';
    const timeSlotIndex = 10;
    const updatedTimeSlot: TimeSlot = { start: new Date('2023-06-10T11:00:00'), end: new Date('2023-06-10T12:00:00') };

    const updatedSchedule = changeTime(schedule, dateId, timeSlotIndex, updatedTimeSlot);

    expect(updatedSchedule).toEqual(schedule);
  });
});
