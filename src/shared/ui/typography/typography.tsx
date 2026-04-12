import clsx from 'clsx';
import classes from './typography.module.css';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body';
  className?: string;
  children?: React.ReactNode;
}

export function Typography({ variant = 'body', className, children }: TypographyProps) {
  const Tag = variant === 'body' ? 'p' : variant;

  return <Tag className={clsx(className, classes[variant])}>{children}</Tag>;
}
