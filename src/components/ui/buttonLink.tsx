import { ComponentProps, JSX, ReactNode } from 'react';
import { CalendarHeart } from 'lucide-react';
import { buttonVariants } from '~/components/ui/button';

type Props = { children: ReactNode } & ComponentProps<'a'>;

export const ButtonLink = ({ children, ...linkProps }: Props): JSX.Element => {
  return (
    <a {...linkProps} className={buttonVariants({ variant: 'ghost' })}>
      <CalendarHeart className="mr-2 h-4 w-4" />
      Today
    </a>
  );
};
