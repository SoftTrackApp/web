import clsx from 'clsx';
import classes from './button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'icon';
type ButtonSize = 'lg' | 'md' | 'sm';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={clsx(classes.button, classes[variant], classes[size], className)}
      {...props}
    />
  );
}
