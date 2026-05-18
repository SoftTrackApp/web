import classes from './board-page.module.css';
import { BoardEntity } from '@/entities/board';
import type { User } from '@/entities/user';
import { CreateBoardDialog } from '@/features/board';
import { Select } from '@/shared/ui/select';
import { Tag } from '@/shared/ui/tag';
import { Typography } from '@/shared/ui/typography';
import { ArrowLeft, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { BehaviorSetEntity } from '@/entities/behavior-set';
import { UsersSidebar } from './users-sidebar';

type Option = {
  label: string;
  value: number;
};

export function BoardPage() {
  const dispatch = useDispatch();

  const board = useSelector(BoardEntity.selectors.selectBoard);
  const behaviorSets = useSelector(BehaviorSetEntity.selectors.selectBehaviorSets);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const behaviorSet = behaviorSets.data.find((bs) => bs.id === board?.behaviorSetId);

  const behaviorSetOptions = behaviorSets.data.map((bs) => ({
    label: bs.name,
    value: bs.id,
  }));

  const defaultBehaviorSet = behaviorSetOptions.find((bs) => bs.value === behaviorSet?.id);

  const navigate = useNavigate();

  const onBehaviorSetChange = (newBehaviorSet: Option) => {
    dispatch(BoardEntity.actions.setBehaviorSetId(newBehaviorSet.value));
  };

  if (!board) {
    return <CreateBoardDialog onClose={() => navigate('/')} />;
  }

  return (
    <div className={classes.wrapper}>
      <title>Доска оценивания - SoftTrack</title>

      <UsersSidebar board={board} selectedUser={selectedUser} onUserSelect={setSelectedUser} />

      {selectedUser ? (
        <section className={classes.middleSection}>
          <div className={classes.userInfo}>
            <div>
              <Typography variant="h3">
                {selectedUser.fName} {selectedUser.lName}
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

            <Typography variant="h2" className={classes.unselectedTitle}>
              Добавьте первое поведение
            </Typography>

            <Typography className={classes.unselectedText}>
              Нажмите на карточку в правой панели или перетащите её в это поле
            </Typography>
          </div>
        </section>
      ) : (
        <section className={classes.middleSection}>
          <div className={classes.suggestion}>
            <div className={classes.bigIcon}>
              <ArrowLeft size={64} />
            </div>

            <Typography variant="h2" className={classes.unselectedTitle}>
              Начните с выбора ученика
            </Typography>

            <Typography className={classes.unselectedText}>
              Выберите имя из списка слева, чтобы открыть профиль и начать процесс оценивания
            </Typography>
          </div>
        </section>
      )}

      <section className={classes.sideSection}>
        <Select
          onChange={(b) => onBehaviorSetChange(b as Option)}
          defaultValue={defaultBehaviorSet}
          options={behaviorSetOptions}
        />

        <div className={classes.behaviorsList} role="list">
          {behaviorSet?.behaviors.map((b) => (
            <div key={b.id} className={classes.behaviorItem} role="listitem">
              {b.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
