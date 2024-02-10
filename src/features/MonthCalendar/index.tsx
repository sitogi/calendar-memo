import { JSX } from 'react';

import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { useDisplayDaysOfMonth } from '~/features/MonthCalendar/hooks/useDisplayDaysOfMonth';

export const MonthCalendar = (): JSX.Element => {
  const { year, month } = useParams();

  const { displayDays, weekdays } = useDisplayDaysOfMonth(Number(year), Number(month), 'sun');

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-center h-16 gap-16">
        <Link
          to={`/month/${month === '1' ? Number(year) - 1 : year}/${month === '1' ? 12 : Number(month) - 1}`}
          className="grid place-content-center border rounded w-20 h-8"
        >
          Prev
        </Link>
        <h1 className="text-center text-3xl">{`${year} - ${month}`}</h1>
        <Link
          to={`/month/${month === '12' ? Number(year) + 1 : year}/${month === '12' ? 1 : Number(month) + 1}`}
          className="grid place-content-center border rounded w-20 h-8"
        >
          Next
        </Link>
      </div>
      <div className="grid grid-cols-7 h-8">
        {weekdays.map((weekday) => {
          return (
            <div key={weekday} className="text-center">
              {weekday}
            </div>
          );
        })}
      </div>
      <div className="h-full grid grid-cols-7 grid-rows-auto-fill border-t border-l">
        {displayDays.map((day, index) => (
          <Day key={index} day={day} />
        ))}
      </div>
    </div>
  );
};

const Day = ({ day }: { day: number }): JSX.Element => {
  return (
    <div className="h-full border-b border-r">
      <div className="flex items-center justify-center h-12">{day}</div>
    </div>
  );
};
