import dayjs from 'dayjs';

export const formatDate = (
  date: Date | string | number,
  format: string = 'DD MMM YY hh:mm',
): string => {
  const dateStr = dayjs(date).format(format);
  if (dateStr.includes('Invalid')) return '';

  return dateStr;
};

export const formatForDateLocal = (value: Date | string | number) =>
  formatDate(value, 'YYYY-MM-DDTHH:mm');
export const formatForDateDropdown = (value: Date | string | number) =>
  formatDate(value, 'YYYY-MM-DD');
export const formatDateForDatabase = (date: Date | string | number): Date =>
  dayjs(date).format('YYYY-MM-DDThh:mm:ssZ') as unknown as Date;

export const addSeconds = (date: Date, seconds: number): Date =>
  dayjs(date).add(seconds, 'seconds').toDate();

export const addMinutes = (date: Date, minutes: number): Date =>
  dayjs(date).add(minutes, 'minutes').toDate();

export const addDays = (date: Date, days: number): Date => dayjs(date).add(days, 'days').toDate();

export const isBefore = (date: Date, secondDate: Date): boolean => dayjs(date).isBefore(secondDate);
