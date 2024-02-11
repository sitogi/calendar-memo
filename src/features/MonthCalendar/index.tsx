import { JSX, useState } from 'react';

import { isToday } from 'date-fns';
import { ArrowLeft, ArrowRight, CalendarHeart, Settings } from 'lucide-react';
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
import { cn } from '~/lib/utils';

export const MonthCalendar = (): JSX.Element => {
  const { year, month } = useDateParams();
  const [weekOrigin, setWeekOrigin] = useState<WeekOrigin>('sun');
  const { displayDates, weekdays } = useDisplayDaysOfMonth(year, month, weekOrigin);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between h-16 px-16 border-b mb-4">
        <Link to="/month" className={buttonVariants({ variant: 'ghost' })}>
          <CalendarHeart className="mr-2 h-4 w-4" />
          Today
        </Link>
        <div className="flex items-center justify-center gap-16">
          <Link
            className={buttonVariants({ variant: 'ghost' })}
            to={`/month/${month === 1 ? year - 1 : year}/${month === 1 ? 12 : month - 1}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Prev
          </Link>
          <h1 className="text-center text-3xl w-36">{`${year} - ${month}`}</h1>
          <Link
            className={buttonVariants({ variant: 'ghost' })}
            to={`/month/${month === 12 ? year + 1 : year}/${month === 12 ? 1 : month + 1}`}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Button>
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
        {displayDates.map((date, index) => (
          <Day key={index} date={date} />
        ))}
      </div>
    </div>
  );
};

const Day = ({ date }: { date: Date }): JSX.Element => {
  return (
    <div className={cn('h-full', 'border-b', 'border-r')}>
      <div className={cn('flex', 'items-center', 'justify-center', 'h-12')}>
        <div className={cn('size-8', 'text-center', isToday(date) && 'bg-green-400 rounded p-1')}>{date.getDate()}</div>
      </div>
    </div>
  );
};
