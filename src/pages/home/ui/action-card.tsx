import { Typography } from '@/shared/ui/typography';
import classes from './action-card.module.css';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export function ActionCard({ icon, title, description, onClick }: ActionCardProps) {
  return (
    <div className={classes.card} onClick={onClick}>
      <div className={classes.icon}>{icon}</div>

      <div>
        <Typography variant="h2" className={classes.title}>
          {title}
        </Typography>
        <Typography className={classes.description}>{description}</Typography>
      </div>
    </div>
  );
}
