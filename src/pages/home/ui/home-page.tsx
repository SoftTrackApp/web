import classes from './home-page.module.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { ChartBarBig, ClipboardCheck } from 'lucide-react';
import { Typography } from '@/shared/ui/typography';
import { CreateBoardDialog } from '@/features/board';
import { ActionCard } from './action-card';
import { useSelector } from 'react-redux';
import { SessionFeature } from '@/features/session';

export function HomePage() {
  const [showBoardDialog, setShowBoardDialog] = useState(false);

  const session = useSelector(SessionFeature.selectors.selectSession);

  return (
    <div className={classes.wrapper}>
      <Typography variant="h1" className={classes.title}>
        Добро пожаловать в Soft Track
      </Typography>

      <div className={classes.cards}>
        {session.data?.role !== 'студент' && (
          <Link to="/board">
            <ActionCard
              title="Доска оценивания"
              description="Оценивайте soft skills учеников в реальном времени"
              icon={<ClipboardCheck size={64} />}
            />
          </Link>
        )}

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
