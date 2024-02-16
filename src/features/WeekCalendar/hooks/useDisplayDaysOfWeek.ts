import { addDays, subDays } from 'date-fns';

import { WeekOrigin } from '~/features/MonthCalendar/types';

type OneWeek = [Date, Date, Date, Date, Date, Date, Date];

type ReturnType = {
  displayDates: OneWeek;
};

const initialDisplayDates: OneWeek = [
  new Date(),
  new Date(),
  new Date(),
  new Date(),
  new Date(),
  new Date(),
  new Date(),
];

export const useDisplayDaysOfWeek = (
  year: number,
  month: number,
  day: number,
  weekOrigin: WeekOrigin = 'sun',
): ReturnType => {
  const targetDate = new Date(year, month - 1, day);
  const targetWeekday = targetDate.getDay();

  if (weekOrigin === 'sun') {
    const displayDates: OneWeek = initialDisplayDates;
    for (let i = 0; i < 7; i++) {
      if (i < targetWeekday) {
        displayDates[i] = subDays(targetDate, targetWeekday - i);
      } else if (i === targetWeekday) {
        displayDates[i] = targetDate;
      } else {
        displayDates[i] = addDays(targetDate, i - targetWeekday);
      }
    }

    return { displayDates };
  } else {
    const displayDates: OneWeek = initialDisplayDates;
    for (let i = 1; i < 7; i++) {
      if (i < targetWeekday) {
        displayDates[i - 1] = subDays(targetDate, targetWeekday - i);
      } else if (i === targetWeekday) {
        displayDates[i - 1] = targetDate;
      } else {
        displayDates[i - 1] = addDays(targetDate, i - targetWeekday);
      }
    }
    displayDates[6] = addDays(targetDate, 7 - targetWeekday);

    return { displayDates };
  }
};
