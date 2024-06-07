export type Schedule = {
  providerId: string;
  providerName: string;
  providerTitle: string;
  dates: ScheduleDate[];
}

export type ScheduleDate = {
  id: string;
  date: Date;
  timeSlots: TimeSlot[];
}

export type TimeSlot = {
  start: Date;
  end: Date;
}