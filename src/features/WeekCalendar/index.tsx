import { JSX, useState } from 'react';

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
import { WeekOrigin } from '~/features/MonthCalendar/types';
import { useDisplayDaysOfWeek } from '~/features/WeekCalendar/hooks/useDisplayDaysOfWeek';
import { useDateParams } from '~/hooks/useDateParams';
import { useNavigateWithViewTransition } from '~/hooks/useNavigateWithViewTransition';
import { compareWithCurrentDate } from '~/utils/date';

export const WeekCalendar = (): JSX.Element => {
  const { year, month, day } = useDateParams();
  console.log({ year, month, day });
  const [weekOrigin, setWeekOrigin] = useState<WeekOrigin>('sun');
  const { displayDates } = useDisplayDaysOfWeek(year, month, day, weekOrigin);
  // const [viewTransitionName, setViewTransitionName] = useState('next-calendar');
  const { navigateWithViewTransition } = useNavigateWithViewTransition();

  console.log(displayDates);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between h-16 px-16 border-b mb-4">
        <ButtonLink
          onClick={() => {
            const result = compareWithCurrentDate(year, month);
            if (result === 'present') {
              return;
            }

            // setViewTransitionName(result === 'past' ? 'next-calendar' : 'prev-calendar');
            navigateWithViewTransition('/month');
          }}
        >
          <CalendarHeart className="mr-2 h-4 w-4" />
          Today
        </ButtonLink>
        <div className="flex items-center justify-center gap-16">
          <ButtonLink
            onClick={() => {
              // setViewTransitionName('prev-calendar');
              navigateWithViewTransition(`/month/${month === 1 ? year - 1 : year}/${month === 1 ? 12 : month - 1}`);
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Prev
          </ButtonLink>
          <h1 className="text-center text-3xl w-36">{`${year} - ${month}`}</h1>
          <ButtonLink
            onClick={() => {
              // setViewTransitionName('next-calendar');
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
      {displayDates.map((date) => (
        <div key={date.toDateString()}>{date.toDateString()}</div>
      ))}
    </div>
  );
};
