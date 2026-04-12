import clsx from 'clsx';
import classes from './error-message.module.css';

interface ErrorMessageProps {
  children?: React.ReactNode;
  className?: string;
}

export function ErrorMessage({ children, className }: ErrorMessageProps) {
  return <span className={clsx(className, classes.errorMessage)}>{children}</span>;
}
