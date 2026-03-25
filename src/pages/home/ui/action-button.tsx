import classes from './action-button.module.css';

interface ActionButtonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function ActionButton({ title, description, icon }: ActionButtonProps) {
  return (
    <div className={classes.actionButton}>
      {icon}

      <div className={classes.info}>
        <h1 className={classes.title}>{title}</h1>
        <span className={classes.description}>{description}</span>
      </div>
    </div>
  );
}
