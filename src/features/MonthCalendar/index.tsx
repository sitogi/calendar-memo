import { JSX, useState } from 'react';

import { Link } from 'react-router-dom';

import { Button, buttonVariants } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useDateParams } from '~/features/MonthCalendar/hooks/useDateParams';
import { useDisplayDaysOfMonth } from '~/features/MonthCalendar/hooks/useDisplayDaysOfMonth';
import { WeekOrigin } from '~/features/MonthCalendar/types';

export const MonthCalendar = (): JSX.Element => {
  const { year, month } = useDateParams();
  const [weekOrigin, setWeekOrigin] = useState<WeekOrigin>('sun');
  const { displayDays, weekdays } = useDisplayDaysOfMonth(year, month, weekOrigin);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between h-16 px-16">
        <Link to="/month" className={buttonVariants({ variant: 'ghost' })}>
          Today
        </Link>
        <div className="flex items-center justify-center gap-16">
          <Link
            to={`/month/${month === 1 ? year - 1 : year}/${month === 1 ? 12 : month - 1}`}
            className={buttonVariants({ variant: 'ghost' })}
          >
            Prev
          </Link>
          <h1 className="text-center text-3xl">{`${year} - ${month}`}</h1>
          <Link
            to={`/month/${month === 12 ? year + 1 : year}/${month === 12 ? 1 : month + 1}`}
            className={buttonVariants({ variant: 'ghost' })}
          >
            Next
          </Link>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">Settings</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Week origin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={weekOrigin} onValueChange={(value) => setWeekOrigin(value as WeekOrigin)}>
                <DropdownMenuRadioItem value="sun">Sunday</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="mon">Monday</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
