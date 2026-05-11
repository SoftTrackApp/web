import clsx from 'clsx';
import classes from './input.module.css';
import { CircleAlert } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

export function Input({ className, error = false, icon, onIconClick, ...props }: InputProps) {
  const hasIcon = Boolean(icon || error);

  return (
    <div className={clsx(className, classes.wrapper, error && classes.error)}>
      <input className={clsx(classes.input, hasIcon && classes.withIcon)} {...props} />

      {icon ? (
        <button type="button" className={classes.icon} onClick={onIconClick}>
          {icon}
        </button>
      ) : error ? (
        <CircleAlert className={clsx(classes.icon, classes.errorIcon)} />
      ) : null}
    </div>
  );
}
