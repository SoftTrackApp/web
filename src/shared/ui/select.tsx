import clsx from 'clsx';
import classes from './select.module.css';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
}

export function Select({ icon, className, ...props }: SelectProps) {
  return (
    <div className={clsx(classes.wrapper, className)}>
      {icon}
      <select className={classes.input} {...props} />
      <ChevronDown className={classes.chevron} />
    </div>
  );
}
