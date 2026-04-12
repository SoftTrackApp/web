import clsx from 'clsx';
import classes from './input.module.css';
import { CircleAlert } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error';
}

export function Input({ className, variant = 'default', ...props }: InputProps) {
  return (
    <label className={clsx(className, classes.wrapper, classes[variant])}>
      <input className={classes.input} {...props} />

      {variant === 'error' && <CircleAlert className={classes.errorIcon} />}
    </label>
  );
}
