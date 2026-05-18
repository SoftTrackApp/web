import classes from './behaviors-sidebar.module.css';
import { Select } from '@/shared/ui/select';
import { BoardEntity, type Board } from '@/entities/board';
import { useDispatch, useSelector } from 'react-redux';
import { BehaviorSetEntity } from '@/entities/behavior-set';

interface BehaviorsSidebar {
  board: Board;
}

type Option = {
  label: string;
  value: number;
};

export function BehaviorsSidebar({ board }: BehaviorsSidebar) {
  const dispatch = useDispatch();

  const behaviorSets = useSelector(BehaviorSetEntity.selectors.selectBehaviorSets);

  const behaviorSet = behaviorSets.data.find((bs) => bs.id === board.behaviorSetId);

  const behaviorSetOptions = behaviorSets.data.map((bs) => ({
    label: bs.name,
    value: bs.id,
  }));

  const defaultBehaviorSet = behaviorSetOptions.find((bs) => bs.value === behaviorSet?.id);

  const onBehaviorSetChange = (newBehaviorSet: Option) => {
    dispatch(BoardEntity.actions.setBehaviorSetId(newBehaviorSet.value));
  };

  return (
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
  );
}
