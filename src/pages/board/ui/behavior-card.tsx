import classes from './behavior-card.module.css';
import type { Behavior } from '@/features/behavior-set';
import { useDraggable } from '@dnd-kit/react';

interface BehaviorCardProps {
  behavior: Behavior;
}

export function BehaviorCard({ behavior }: BehaviorCardProps) {
  const { ref } = useDraggable({
    id: behavior.name,
    data: { behaviorName: behavior.name },
  });

  return (
    <div className={classes.behaviorCard} ref={ref} role="listitem">
      {behavior.name}
    </div>
  );
}
