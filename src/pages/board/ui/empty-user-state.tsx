import classes from './empty-user-state.module.css';
import { Typography } from '@/shared/ui/typography';
import { ArrowLeft } from 'lucide-react';

export function EmptyUserState() {
  return (
    <section className={classes.middleSection}>
      <div className={classes.suggestion}>
        <div className={classes.bigIcon}>
          <ArrowLeft size={64} />
        </div>

        <Typography variant="h2" className={classes.suggestionTitle}>
          Начните с выбора ученика
        </Typography>

        <Typography className={classes.suggestionText}>
          Выберите имя из списка слева, чтобы открыть профиль и начать процесс оценивания
        </Typography>
      </div>
    </section>
  );
}
