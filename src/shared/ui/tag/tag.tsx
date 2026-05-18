import classes from './tag.module.css';

interface TagProps {
  children: React.ReactNode;
}

export function Tag({ children }: TagProps) {
  return <span className={classes.tag}>{children}</span>;
}
