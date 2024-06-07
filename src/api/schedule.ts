import { Schedule } from "../models/Schedule";

export const fetchSchedule = async (providerId: string) => {
  const response = await fetch(`https://henrymeds.com/api/v1/providers/${providerId}`);
  if (!response.ok) {
    throw new Error('Network error fetching schedule for provider ' + providerId);
  }
  return response.json();
}

export const saveSchedule = async (schedule: Schedule): Promise<Schedule> => {
  const response = await fetch(`https://henrymeds.com/api/v1/providers/${schedule.providerId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(schedule)
  });
  if (!response.ok) {
    throw new Error('Network error fetching schedule for provider ' + schedule.providerId);
  }
  return response.json();
}

