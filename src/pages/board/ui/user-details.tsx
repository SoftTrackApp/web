import classes from './user-details.module.css';
import clsx from 'clsx';
import { useDroppable } from '@dnd-kit/react';
import { Typography } from '@/shared/ui/typography';
import { ClipboardCheck } from 'lucide-react';
import { Tag } from '@/shared/ui/tag';
import type { Board } from '@/entities/board';
import type { User } from '@/entities/user';

interface UserDetailsProps {
  board: Board;
  user: User;
  dragging: boolean;
}

export function UserDetails({ board, user, dragging }: UserDetailsProps) {
  const { ref } = useDroppable({ id: 'droppable' });

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

        <Tag>{user.behaviors?.length ?? '0'} поведений</Tag>
      </div>

      <div className={clsx(classes.droppableWrapper, dragging && classes.dragging)} ref={ref}>
        {user.behaviors ? (
          <div className={classes.behaviorsList} role="list">
            {user.behaviors.map((b) => (
              <div key={b.id} className={classes.behaviorItem} role="listitem">
                <span>{b.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={classes.suggestion}>
            <div className={classes.bigIcon}>
              <ClipboardCheck size={64} />
            </div>

            <Typography variant="h2" className={classes.suggestionText}>
              Добавьте первое поведение
            </Typography>

            <Typography className={classes.suggestionTitle}>
              Перетащите карточку из правой панели в это поле
            </Typography>
          </div>
        )}
      </div>
    </section>
  );
}
