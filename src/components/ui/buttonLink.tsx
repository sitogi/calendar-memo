import { ComponentProps, JSX, ReactNode } from 'react';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/lib/utils';

type Props = { children: ReactNode } & ComponentProps<'a'>;

export const ButtonLink = ({ children, ...linkProps }: Props): JSX.Element => {
  return (
    <a {...linkProps} className={cn(linkProps.className, buttonVariants({ variant: 'ghost' }))}>
      {children}
    </a>
  );
};
