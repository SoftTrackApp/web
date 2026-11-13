import classes from './skills-cards.module.css';
import { Plus } from 'lucide-react';
import type { BehaviorSet } from '@/entities/behavior-set';
import { useCardDnd } from '../model/use-card-dnd';
import { SetCard } from './set-card';
import { SkillsSkeleton } from './skills-skeleton';
import { SkillsEmptyState } from './skills-empty-state';

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
  const { orderedSets, getCardProps } = useCardDnd(sets);

  if (isLoading) {
    return <SkillsSkeleton />;
  }

  if (orderedSets.length === 0) {
    return <SkillsEmptyState onCreateBehavior={onCreateBehavior} />;
  }

  return (
    <div className={classes.cardsRow}>
      {orderedSets.map((set, index) => (
        <SetCard
          key={set.id}
          name={set.name}
          behaviors={set.behaviors}
          onAdd={onAddSkill}
          onEdit={() => onEditSkill(set)}
          {...getCardProps(index)}
        />
      ))}

      <button className={classes.createCard} onClick={onCreateBehavior}>
        <span className={classes.createCardText}>Создать поведение</span>
        <Plus size={38} strokeWidth={2.5} className={classes.createCardPlus} />
      </button>
    </div>
  );
}
