import clsx from 'clsx';
import classes from './input.module.css';
import { CircleAlert } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error';
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

export function Input({ className, variant = 'default', icon, onIconClick, ...props }: InputProps) {
  return (
    <label className={clsx(className, classes.wrapper, classes[variant])}>
      <input className={classes.input} {...props} />

      {icon ? (
        <button type="button" className={classes.icon} onClick={onIconClick}>
          {icon}
        </button>
      ) : variant === 'error' ? (
        <CircleAlert className={classes.errorIcon} />
      ) : null}
    </label>
  );
}
