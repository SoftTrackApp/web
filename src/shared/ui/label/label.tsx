import clsx from 'clsx';
import classes from './label.module.css';

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={clsx(className, classes.label)} {...props} />;
}
