import classes from './skills-cards.module.css';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { SetCard } from '@/widgets/set-card';
import type { BehaviorSet } from '@/entities/behavior-set';

interface SkillsCardsProps {
  sets: BehaviorSet[];
  isLoading: boolean;
  onAddSkill: () => void;
  onEditSkill: (set: BehaviorSet) => void;
  onCreateBehavior: () => void;
}

export function SkillsCards({
  sets,
  isLoading,
  onAddSkill,
  onEditSkill,
  onCreateBehavior,
}: SkillsCardsProps) {
  const [orderedSets, setOrderedSets] = useState(sets);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  useEffect(() => {
    setOrderedSets(sets);
  }, [sets]);

  const dropCard = (target: number) => {
    if (dragIndex === null) return;

    setOrderedSets((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(target, 0, moved);
      return next;
    });

    setDragIndex(null);
    setOverIndex(null);
  };

  if (isLoading) {
    return (
      <div className={classes.cardsRow}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={classes.skeletonCard}>
            <div className={classes.skeletonTitle} />
            <div className={classes.skeletonLine} />
            <div className={classes.skeletonRow} />
            <div className={classes.skeletonRow} />
          </div>
        ))}
      </div>
    );
  }

  if (orderedSets.length === 0) {
    return (
      <div className={classes.emptyState}>
        <span className={classes.emptyTitle}>Здесь пока пусто</span>
        <span className={classes.emptyText}>Добавьте первое поведение</span>
        <button className={classes.emptyButton} onClick={onCreateBehavior}>
          <Plus size={14} />
          Создать поведение
        </button>
      </div>
    );
  }

  return (
    <div className={classes.cardsRow}>
      {orderedSets.map((set, index) => (
        <SetCard
          key={set.id}
          name={set.name}
          behaviors={set.behaviors}
          isDragged={dragIndex === index}
          isOver={overIndex === index && dragIndex !== index}
          onDragStart={() => setDragIndex(index)}
          onDragEnd={() => {
            setDragIndex(null);
            setOverIndex(null);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            if (dragIndex !== null && index !== dragIndex) setOverIndex(index);
          }}
          onDrop={() => dropCard(index)}
          onAdd={onAddSkill}
          onEdit={() => onEditSkill(set)}
        />
      ))}

      <button className={classes.createCard} onClick={onCreateBehavior}>
        <span className={classes.createCardText}>Создать поведение</span>
        <Plus size={38} strokeWidth={2.5} className={classes.createCardPlus} />
      </button>
    </div>
  );
}
