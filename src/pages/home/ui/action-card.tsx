import { Typography } from '@/shared/ui/typography';
import classes from './action-card.module.css';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ActionCard({ icon, title, description }: ActionCardProps) {
  return (
    <div className={classes.card}>
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
