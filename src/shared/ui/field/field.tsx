import clsx from 'clsx';
import classes from './field.module.css';

interface FieldProps {
  className?: string;
  children?: React.ReactNode;
}

export function Field({ className, children }: FieldProps) {
  return <div className={clsx(className, classes.field)}>{children}</div>;
}
