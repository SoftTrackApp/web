import clsx from 'clsx';
import classes from './select.module.css';
import { ChevronDown } from 'lucide-react';

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={classes.wrapper}>
      <select className={clsx(classes.input, className)} {...props} />
      <ChevronDown className={classes.chevron} strokeWidth={0} fill="var(--c-gray-500)" />
    </div>
  );
}
