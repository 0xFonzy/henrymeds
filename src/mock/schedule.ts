import { addHours } from "date-fns";
import { Schedule } from "../models/Schedule";

export let scheduleData: Schedule = {
  providerId: "provider1",
  providerName: "Michelle Deflorimonte",
  providerTitle: "NP",
  dates: [
    {
      id: "date1",
      date: new Date('2024-06-08'),
      timeSlots: [
        {
          start: new Date('2024-06-08'),
          end: addHours(new Date('2024-06-08'), 1)
        }
      ]
    },
    {
      id: "date2",
      date: new Date('2024-06-25'),
      timeSlots: [
        {
          start: new Date('2024-06-25'),
          end: addHours(new Date('2024-06-25'), 1)
        }
      ]
    },
    {
      id: "date3",
      date: new Date('2024-06-26'),
      timeSlots: [
        {
          start: new Date('2024-06-26'),
          end: addHours(new Date('2024-06-26'), 1)
        }
      ]
    },
    {
      id: "date4",
      date: new Date('2024-06-27'),
      timeSlots: [
        {
          start: new Date('2024-06-27'),
          end: addHours(new Date('2024-06-27'), 1)
        }
      ]
    },
    {
      id: "date5",
      date: new Date('2024-06-28'),
      timeSlots: [
        {
          start: new Date('2024-06-28'),
          end: addHours(new Date('2024-06-28'), 1)
        }
      ]
    }
  ]
}