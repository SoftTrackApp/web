import type { Behavior } from '@/entities/behavior-set';
import { useDraggable } from '@dnd-kit/react';
import classes from './behavior-item.module.css';

interface BehaviorItemProps {
  behavior: Behavior;
  onClick: () => void;
}

export function BehaviorItem({ behavior, onClick }: BehaviorItemProps) {
  const { ref } = useDraggable({ id: `behavior-${behavior.id}` });

  return (
    <div className={classes.behaviorItem} ref={ref} role="listitem" onClick={onClick}>
      {behavior.name}
    </div>
  );
}
