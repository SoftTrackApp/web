import type { Behavior } from '@/entities/behavior';
import { useDraggable } from '@dnd-kit/react';
import classes from './behavior-item.module.css';

interface BehaviorItemProps {
  behavior: Behavior;
}

export function BehaviorItem({ behavior }: BehaviorItemProps) {
  const { ref } = useDraggable({ id: `behavior-${behavior.id}` });

  return (
    <div className={classes.behaviorItem} ref={ref} role="listitem">
      {behavior.name}
    </div>
  );
}
