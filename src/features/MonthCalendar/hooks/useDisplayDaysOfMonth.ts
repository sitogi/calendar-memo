import { useMemo } from 'react';

import { WeekOrigin } from '~/features/MonthCalendar/types';
import { getEndDayOfMonth, getNextMonthDaysOfFinalWeek, getPrevMonthDaysOfFirstWeek, getWeekDays } from '~/utils/date';

type ReturnType = {
  displayDays: number[];
  weekdays: string[];
};

export const useDisplayDaysOfMonth = (year: number, month: number, weekOrigin: WeekOrigin = 'sun'): ReturnType => {
  const daysOfFirstWeekOfPrevMonth = useMemo(() => {
    return getPrevMonthDaysOfFirstWeek(Number(year), Number(month));
  }, [year, month]);

  const endDayOfMonth = useMemo(() => {
    return getEndDayOfMonth(Number(year), Number(month));
  }, [year, month]);

  const nextMonthDaysOfFinalWeek = useMemo(() => {
    return getNextMonthDaysOfFinalWeek(Number(year), Number(month), weekOrigin);
  }, [year, month]);

  const weekdays = useMemo(() => {
    return getWeekDays(weekOrigin);
  }, [weekOrigin]);

  const displayDays: number[] = [];
  displayDays.push(...daysOfFirstWeekOfPrevMonth);
  for (let i = 1; i <= endDayOfMonth; i++) {
    displayDays.push(i);
  }
  displayDays.push(...nextMonthDaysOfFinalWeek);

  return { displayDays, weekdays };
};
