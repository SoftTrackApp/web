import classes from './empty-user-state.module.css';
import { Typography } from '@/shared/ui/typography';
import { UserSearch } from 'lucide-react';

export function EmptyUserState() {
  return (
    <div className={classes.suggestion}>
      <div className={classes.bigIcon}>
        <UserSearch size={64} />
      </div>

      <Typography variant="h2" className={classes.suggestionTitle}>
        Ученик не выбран
      </Typography>

      <Typography className={classes.suggestionText}>
        Чтобы посмотреть статистику по навыкам и прогрессу, выберите ученика из выпадающего списка
        выше
      </Typography>
    </div>
  );
}
