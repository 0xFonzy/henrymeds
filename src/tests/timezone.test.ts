import { getTimeZoneAbbreviation } from '../lib/timezone';

describe('getTimeZoneAbbreviation', () => {
  it('should return EST for America/New_York', () => {
    expect(getTimeZoneAbbreviation('America/New_York')).toBe('EST');
  });

  it('should return CST for America/Chicago', () => {
    expect(getTimeZoneAbbreviation('America/Chicago')).toBe('CST');
  });

  it('should return MST for America/Denver', () => {
    expect(getTimeZoneAbbreviation('America/Denver')).toBe('MST');
  });

  it('should return PST for America/Los_Angeles', () => {
    expect(getTimeZoneAbbreviation('America/Los_Angeles')).toBe('PST');
  });

  it('should return PST for an invalid time zone', () => {
    expect(getTimeZoneAbbreviation('Invalid/Timezone')).toBe('PST');
  });

  it('should return PST for an empty string', () => {
    expect(getTimeZoneAbbreviation('')).toBe('PST');
  });

  it('should return PST for undefined', () => {
    expect(getTimeZoneAbbreviation(undefined as unknown as string)).toBe('PST');
  });

  it('should return PST for null', () => {
    expect(getTimeZoneAbbreviation(null as unknown as string)).toBe('PST');
  });
});
