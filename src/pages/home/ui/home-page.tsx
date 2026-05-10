import classes from './home-page.module.css';
import { ChartBarBig, ClipboardCheck } from 'lucide-react';
import { ActionCard } from './action-card';
import { Typography } from '@/shared/ui/typography';
import { Link } from 'react-router';

export function HomePage() {
  return (
    <div className={classes.wrapper}>
      <Typography variant="h1" className={classes.title}>
        Добро пожаловать в Soft Track
      </Typography>

      <div className={classes.cards}>
        <ActionCard
          title="Доска оценивания"
          description="Оценивайте soft skills учеников в реальном времени"
          icon={<ClipboardCheck size={64} />}
        />

        <Link to="/dashboard">
          <ActionCard
            title="Статистика"
            description="Отслеживайте динамику и успеваемость групп"
            icon={<ChartBarBig size={64} />}
          />
        </Link>
      </div>
    </div>
  );
}
