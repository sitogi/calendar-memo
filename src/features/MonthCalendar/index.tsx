import { JSX, useState } from 'react';

import { isToday } from 'date-fns';
import { ArrowLeft, ArrowRight, CalendarHeart, Settings } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { ButtonLink } from '~/components/ui/buttonLink';
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
import { useNavigateWithViewTransition } from '~/hooks/useNavigateWithViewTransition';
import { cn } from '~/lib/utils';
import { compareWithCurrentDate } from '~/utils/date';

export const MonthCalendar = (): JSX.Element => {
  const { year, month } = useDateParams();
  const [weekOrigin, setWeekOrigin] = useState<WeekOrigin>('sun');
  const { displayDates, weekdays } = useDisplayDaysOfMonth(year, month, weekOrigin);
  const [viewTransitionName, setViewTransitionName] = useState('next-calendar');
  const { navigateWithViewTransition } = useNavigateWithViewTransition();

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between h-16 px-16 border-b mb-4">
        <ButtonLink
          onClick={() => {
            const result = compareWithCurrentDate(year, month);
            if (result === 'present') {
              return;
            }

            setViewTransitionName(result === 'past' ? 'next-calendar' : 'prev-calendar');
            navigateWithViewTransition('/month');
          }}
        >
          <CalendarHeart className="mr-2 h-4 w-4" />
          Today
        </ButtonLink>
        <div className="flex items-center justify-center gap-16">
          <ButtonLink
            onClick={() => {
              setViewTransitionName('prev-calendar');
              navigateWithViewTransition(`/month/${month === 1 ? year - 1 : year}/${month === 1 ? 12 : month - 1}`);
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Prev
          </ButtonLink>
          <h1 className="text-center text-3xl w-36">{`${year} - ${month}`}</h1>
          <ButtonLink
            onClick={() => {
              setViewTransitionName('next-calendar');
              navigateWithViewTransition(`/month/${month === 12 ? year + 1 : year}/${month === 12 ? 1 : month + 1}`);
            }}
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonLink>
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
            <div
              key={weekday}
              className={cn('text-center', weekday === 'Sat' && 'text-blue-500', weekday === 'Sun' && 'text-red-400')}
            >
              {weekday}
            </div>
          );
        })}
      </div>
      <div className="h-full grid grid-cols-7 grid-rows-auto-fill border-t border-l" style={{ viewTransitionName }}>
        {displayDates.map((date, index) => (
          <Day key={index} date={date} displayedMonth={month} />
        ))}
      </div>
    </div>
  );
};

const Day = ({ date, displayedMonth }: { date: Date; displayedMonth: number }): JSX.Element => {
  const isDisplayedMonthDate = date.getMonth() !== displayedMonth - 1;

  return (
    <div className={cn('h-full', 'border-b', 'border-r')}>
      <div className={cn('flex', 'items-center', 'justify-center', 'h-12')}>
        <div
          className={cn(
            'size-8',
            'text-center',
            isToday(date) && 'bg-green-400 rounded p-1',
            isDisplayedMonthDate && 'text-gray-300',
          )}
        >
          {date.getDate()}
        </div>
      </div>
    </div>
  );
};
