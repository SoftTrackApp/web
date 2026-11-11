import classes from './set-card.module.css';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { DotsMenu } from './dots-menu';
import type { Behavior } from '@/entities/behavior-set';

interface SetCardProps {
  name: string;
  behaviors: Behavior[];
  isDragged: boolean;
  isOver: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  onAdd: () => void;
  onEdit: () => void;
}

export function SetCard({
  name,
  behaviors,
  isDragged,
  isOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onAdd,
  onEdit,
}: SetCardProps) {
  return (
    <section
      className={clsx(classes.card, isDragged && classes.cardDragged, isOver && classes.cardOver)}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className={classes.cardHeader}>
        <span className={classes.cardName}>{name}</span>
        <DotsMenu onEdit={onEdit} />
      </div>

      <button className={classes.addSkill} onClick={onAdd}>
        <Plus size={14} />
        Добавить soft skill
      </button>

      <div className={classes.rows}>
        {behaviors.map((behavior) => (
          <div key={behavior.id} className={classes.row}>
            <span className={classes.rowName}>{behavior.name}</span>
            <DotsMenu onEdit={onEdit} />
          </div>
        ))}
      </div>
    </section>
  );
}
