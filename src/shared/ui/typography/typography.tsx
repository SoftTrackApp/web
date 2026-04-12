import clsx from 'clsx';
import classes from './typography.module.css';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'body';
  children: React.ReactNode;
  className?: string;
}

export function Typography({ variant = 'body', children, className }: TypographyProps) {
  const Tag = variant === 'body' ? 'p' : variant;

  return <Tag className={clsx(className, classes[variant])}>{children}</Tag>;
}
