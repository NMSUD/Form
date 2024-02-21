import { describe, expect, test } from 'vitest';

import {
  addDays,
  addMinutes,
  addSeconds,
  formatDate,
  formatDateForDatabase,
  formatForDateDropdown,
  formatForDateLocal,
  isBefore,
} from './dateHelper';

describe('Date helper tests', () => {
  test('formatDate', () => {
    const dateStr = formatDate('2024-01-01');
    expect(dateStr).toBe('01 Jan 24 12:00');
  });
  test('formatDate invalid date', () => {
    const dateStr = formatDate({} as any);
    expect(dateStr).toBe('');
  });
  test('formatForDateLocal', () => {
    const dateStr = formatForDateLocal('2024-01-01 08:00');
    expect(dateStr).toBe('2024-01-01T08:00');
  });
  test('formatForDateDropdown', () => {
    const dateStr = formatForDateDropdown('2024-01-01 08:00');
    expect(dateStr).toBe('2024-01-01');
  });
  test('formatDateForDatabase', () => {
    const dateStr = formatDateForDatabase('2024-01-01 08:00');
    expect(dateStr).toContain('2024-01-01T08:00:00');
  });
  test('addSeconds', () => {
    const newDate = new Date();
    const date = addSeconds(newDate, 1000);
    expect(date.getTime()).toBeGreaterThan(newDate.getTime());
  });
  test('addMinutes', () => {
    const newDate = new Date();
    const date = addMinutes(newDate, 1000);
    expect(date.getTime()).toBeGreaterThan(newDate.getTime());
  });
  test('addDays', () => {
    const newDate = new Date();
    const date = addDays(newDate, 10);
    expect(date.getTime()).toBeGreaterThan(newDate.getTime());
  });
  test('isBefore', () => {
    const newDate = new Date();
    const date = addDays(newDate, 10);
    expect(isBefore(newDate, date)).toBeTruthy();
  });
});
