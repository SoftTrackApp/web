import classes from './behaviors-sidebar.module.css';
import { Select } from '@/shared/ui/select/select';
import { BoardEntity, type Board } from '@/entities/board';
import { BehaviorItem } from './behavior-item';
import { useBehaviorSets } from '@/entities/behavior-set';

interface BehaviorsSidebar {
  board: Board;
  onBehaviorClick: (behaviorId: number) => void;
}

type Option = {
  label: string;
  value: number;
};

export function BehaviorsSidebar({ board, onBehaviorClick }: BehaviorsSidebar) {
  const setBehaviorSetId = BoardEntity.useSetBehaviorSetId();

  const behaviorSets = useBehaviorSets();

  if (behaviorSets.isPending) return null;
  if (behaviorSets.error) return <span>{behaviorSets.error.message}</span>;

  const behaviorSet = behaviorSets.data?.find(
    (bs) => bs.id === board.behaviorSetId,
  );

  const behaviorSetOptions = behaviorSets.data?.map((bs) => ({
    label: bs.name,
    value: bs.id,
  }));

  const defaultBehaviorSet = behaviorSetOptions?.find(
    (bs) => bs.value === behaviorSet?.id,
  );

  const onBehaviorSetChange = (newBehaviorSet: Option) => {
    setBehaviorSetId.mutate(newBehaviorSet.value);
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
          <BehaviorItem
            key={b.id}
            behavior={b}
            onClick={() => onBehaviorClick(b.id)}
          />
        ))}
      </div>
    </section>
  );
}
