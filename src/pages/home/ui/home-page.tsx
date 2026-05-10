import classes from './home-page.module.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { ChartBarBig, ClipboardCheck } from 'lucide-react';
import { Typography } from '@/shared/ui/typography';
import { CreateBoardDialog } from '@/features/board';
import { ActionCard } from './action-card';

export function HomePage() {
  const [showBoardDialog, setShowBoardDialog] = useState(false);

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
          onClick={() => setShowBoardDialog(true)}
        />

        <Link to="/dashboard">
          <ActionCard
            title="Статистика"
            description="Отслеживайте динамику и успеваемость групп"
            icon={<ChartBarBig size={64} />}
          />
        </Link>
      </div>

      {showBoardDialog && <CreateBoardDialog onClose={() => setShowBoardDialog(false)} />}
    </div>
  );
}
