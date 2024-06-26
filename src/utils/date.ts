import { getDay, lastDayOfMonth } from 'date-fns';

import { WeekOrigin } from '~/features/MonthCalendar/types';

export type WeekDay = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export const weekdayStrMap: { [key: number]: WeekDay } = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

export function getWeekDays(weekOrigin: WeekOrigin = 'sun'): WeekDay[] {
  if (weekOrigin === 'sun') {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }

  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}

export function getEndDateOfMonth(year: number, month: number): Date {
  const date = new Date(year, month - 1);

  return lastDayOfMonth(date);
}

export function getPrevMonthDaysOfFirstWeek(year: number, month: number, weekOrigin: WeekOrigin = 'sun'): Date[] {
  const firstOfMonth = new Date(year, month - 1, 1);
  const weekDay = getDay(firstOfMonth);
  const dates = [];
  const endDayOfLastMonth = getEndDateOfMonth(year, month - 1);

  for (let i = weekOrigin === 'sun' ? weekDay - 1 : weekDay - 2; i >= 0; i--) {
    const date = new Date(endDayOfLastMonth);
    date.setDate(endDayOfLastMonth.getDate() - i);
    dates.push(date);
  }

  return dates;
}

export function getNextMonthDaysOfFinalWeek(year: number, month: number, weekOrigin: WeekOrigin = 'sun'): Date[] {
  const date = new Date(year, month - 1);
  const endOfMonth = lastDayOfMonth(date);
  const finalWeekday = getDay(endOfMonth);

  if (finalWeekday === 0 && weekOrigin === 'mon') {
    return [];
  }

  const end = weekOrigin === 'sun' ? 6 - finalWeekday : 7 - finalWeekday;
  const dates: Date[] = [];

  for (let i = 1; i <= end; i++) {
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(i);
    dates.push(date);
  }

  return dates;
}

type ComparisonResult = 'past' | 'present' | 'future';

export function compareWithCurrentDate(year: number, month: number): ComparisonResult {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return 'past';
  } else if (year > currentYear || (year === currentYear && month > currentMonth)) {
    return 'future';
  } else {
    return 'present';
  }
}
