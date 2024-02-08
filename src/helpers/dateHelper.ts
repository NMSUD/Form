import dayjs from 'dayjs';

export const formatDate = (
  date: Date | string | number,
  format: string = 'DD MMM YY hh:mm',
): string => {
  try {
    return dayjs(date).format(format);
  } catch {
    return '';
  }
};

export const formatForDateLocal = (value: Date | string | number) =>
  formatDate(value, 'YYYY-MM-DDTHH:mm');

export const addSeconds = (date: Date, seconds: number): Date => {
  try {
    return dayjs(date).add(seconds, 'seconds').toDate();
  } catch {
    return date;
  }
};

export const addDate = (date: Date, days: number): Date => {
  try {
    return dayjs(date).add(days, 'days').toDate();
  } catch {
    return date;
  }
};

export const isBefore = (date: Date, secondDate: Date): boolean => {
  try {
    return dayjs(date).isBefore(secondDate);
  } catch {
    return false;
  }
};
