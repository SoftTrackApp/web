import clsx from 'clsx';
import classes from './input.module.css';
import { CircleAlert } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  destructive?: boolean;
  onTrailingIconClick?: () => void;
}

export function Input({
  className,
  icon,
  trailingIcon,
  destructive = false,
  onTrailingIconClick,
  ...props
}: InputProps) {
  return (
    <label className={clsx(classes.wrapper, destructive && classes.destructive, className)}>
      {icon && <div className={classes.icon}>{icon}</div>}

      <input className={classes.input} {...props} />

      {trailingIcon ? (
        <div className={classes.trailingIcon} onClick={onTrailingIconClick}>
          {trailingIcon}
        </div>
      ) : destructive ? (
        <div className={clsx(classes.trailingIcon, classes.destructiveIcon)}>
          <CircleAlert />
        </div>
      ) : null}
    </label>
  );
}
