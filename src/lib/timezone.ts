export enum TimeZoneEnum {
  "America/New_York" = "EST",
  "America/Chicago" = "CST",
  "America/Denver" = "MST",
  "America/Los_Angeles" = "PST",
}

export function getTimeZoneAbbreviation(timeZone: string) {
  return TimeZoneEnum[timeZone as keyof typeof TimeZoneEnum] || "PST";
}