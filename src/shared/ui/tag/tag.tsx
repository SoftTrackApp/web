import clsx from 'clsx';
import classes from './tag.module.css';

export type TagTone = 'purple' | 'red' | 'yellow' | 'green' | 'grey';

interface TagProps {
  children: React.ReactNode;
  tone?: TagTone;
  className?: string;
}

export function Tag({ children, tone = 'purple', className }: TagProps) {
  return <span className={clsx(classes.tag, classes[tone], className)}>{children}</span>;
}
