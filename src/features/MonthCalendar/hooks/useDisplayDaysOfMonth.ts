import { useMemo } from 'react';

import { WeekOrigin } from '~/features/MonthCalendar/types';
import { getEndDateOfMonth, getNextMonthDaysOfFinalWeek, getPrevMonthDaysOfFirstWeek, getWeekDays } from '~/utils/date';

type ReturnType = {
  displayDates: Date[];
  weekdays: string[];
};

export const useDisplayDaysOfMonth = (year: number, month: number, weekOrigin: WeekOrigin = 'sun'): ReturnType => {
  const daysOfFirstWeekOfPrevMonth = useMemo(() => {
    return getPrevMonthDaysOfFirstWeek(Number(year), Number(month), weekOrigin);
  }, [year, month, weekOrigin]);

  const endDateOfMonth = useMemo(() => {
    return getEndDateOfMonth(Number(year), Number(month));
  }, [year, month]);

  const nextMonthDaysOfFinalWeek = useMemo(() => {
    return getNextMonthDaysOfFinalWeek(Number(year), Number(month), weekOrigin);
  }, [year, month, weekOrigin]);

  const weekdays = useMemo(() => {
    return getWeekDays(weekOrigin);
  }, [weekOrigin]);

  const displayDates: Date[] = [];

  displayDates.push(...daysOfFirstWeekOfPrevMonth);

  for (let i = 1; i <= endDateOfMonth.getDate(); i++) {
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month - 1);
    date.setDate(i);
    displayDates.push(date);
  }

  displayDates.push(...nextMonthDaysOfFinalWeek);

  return { displayDates, weekdays };
};
