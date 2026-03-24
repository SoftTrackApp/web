import clsx from 'clsx';
import classes from './button.module.css';

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx(classes.button, className)} {...props} />;
}
