import { getDay, lastDayOfMonth } from 'date-fns';

import { WeekOrigin } from '~/features/MonthCalendar/types';

export type WeekDay = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

const weekDayStrMap: Record<number, WeekDay> = {
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

export function getEndDayOfMonth(year: number, month: number): number {
  const date = new Date(year, month - 1);
  const endOfMonth = lastDayOfMonth(date);

  return endOfMonth.getDate();
}

export function getPrevMonthDaysOfFirstWeek(year: number, month: number): number[] {
  const firstOfMonth = new Date(year, month - 1, 1);
  const weekDay = getDay(firstOfMonth);
  const days = [];

  const endDayOfLastMonth = getEndDayOfMonth(year, month - 1);

  for (let i = weekDay - 1; i >= 0; i--) {
    days.push(endDayOfLastMonth - i);
  }

  return days;
}

export function getEndWeekDayOfMonth(year: number, month: number): WeekDay {
  const date = new Date(year, month - 1);
  const endOfMonth = lastDayOfMonth(date);

  return weekDayStrMap[getDay(endOfMonth)];
}

export function getFirstWeekDayOfMonth(year: number, month: number): WeekDay {
  const firstOfMonth = new Date(year, month - 1, 1);
  const weekDay = getDay(firstOfMonth);

  return weekDayStrMap[weekDay];
}

export function getNextMonthDaysOfFinalWeek(year: number, month: number, weekOrigin: WeekOrigin = 'sun'): number[] {
  const date = new Date(year, month - 1);
  const endOfMonth = lastDayOfMonth(date);

  if (weekOrigin === 'sun') {
    const weekDay = getDay(endOfMonth);
    const days = [];

    for (let i = 1; i <= 6 - weekDay; i++) {
      days.push(i);
    }

    return days;
  }

  const weekDay = getDay(endOfMonth);
  const days = [];

  for (let i = 1; i <= 7 - weekDay; i++) {
    days.push(i);
  }

  return days;
}
