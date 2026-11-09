import classes from './textarea.module.css';
import clsx from 'clsx';
import { CircleAlert } from 'lucide-react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({
  className,
  error = false,
  ...props
}: TextareaProps) {
  return (
    <div className={clsx(className, classes.wrapper, error && classes.error)}>
      <textarea className={classes.textarea} rows={4} {...props} />

      {error && <CircleAlert className={classes.errorIcon} />}
    </div>
  );
}
