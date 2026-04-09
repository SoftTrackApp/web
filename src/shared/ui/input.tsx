import clsx from 'clsx';
import classes from './input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export function Input({ className, icon, ...props }: InputProps) {
  return (
    <label className={clsx(classes.wrapper, className)}>
      {icon && <div className={classes.icon}>{icon}</div>}
      <input className={classes.input} {...props} />
    </label>
  );
}
