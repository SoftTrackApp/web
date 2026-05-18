import classes from './user-details.module.css';
import { Typography } from '@/shared/ui/typography';
import { ClipboardCheck } from 'lucide-react';
import { Tag } from '@/shared/ui/tag';
import type { Board } from '@/entities/board';
import type { User } from '@/entities/user';

interface UserDetailsProps {
  board: Board;
  user: User;
}

export function UserDetails({ board, user }: UserDetailsProps) {
  return (
    <section className={classes.middleSection}>
      <div className={classes.userInfo}>
        <div>
          <Typography variant="h3">
            {user.fName} {user.lName}
          </Typography>

          <Typography>
            {board.groupName1} &bull; {board.name}
          </Typography>
        </div>

        <Tag>0 поведений</Tag>
      </div>

      <div className={classes.suggestion}>
        <div className={classes.bigIcon}>
          <ClipboardCheck size={64} />
        </div>

        <Typography variant="h2" className={classes.suggestionText}>
          Добавьте первое поведение
        </Typography>

        <Typography className={classes.suggestionTitle}>
          Нажмите на карточку в правой панели или перетащите её в это поле
        </Typography>
      </div>
    </section>
  );
}
