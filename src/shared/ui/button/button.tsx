import clsx from 'clsx';
import classes from './button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'lg' | 'md' | 'sm';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        classes.button,
        classes[variant],
        classes[size],
        iconOnly && classes.iconOnly,
        className,
      )}
      {...props}
    />
  );
}
