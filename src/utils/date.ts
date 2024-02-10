import { getDay, lastDayOfMonth } from 'date-fns';

import { WeekOrigin } from '~/features/MonthCalendar/types';

export type WeekDay = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

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

export function getPrevMonthDaysOfFirstWeek(year: number, month: number, weekOrigin: WeekOrigin = 'sun'): number[] {
  const firstOfMonth = new Date(year, month - 1, 1);
  const weekDay = getDay(firstOfMonth);
  const days = [];
  const endDayOfLastMonth = getEndDayOfMonth(year, month - 1);

  for (let i = weekOrigin === 'sun' ? weekDay - 1 : weekDay - 2; i >= 0; i--) {
    days.push(endDayOfLastMonth - i);
  }

  return days;
}

export function getNextMonthDaysOfFinalWeek(year: number, month: number, weekOrigin: WeekOrigin = 'sun'): number[] {
  const date = new Date(year, month - 1);
  const endOfMonth = lastDayOfMonth(date);
  const weekDay = getDay(endOfMonth);
  const end = weekOrigin === 'sun' ? 6 - weekDay : 7 - weekDay;
  const days = [];

  for (let i = 1; i <= end; i++) {
    days.push(i);
  }

  return days;
}
