import classes from './skills-empty-state.module.css';
import { Plus } from 'lucide-react';

interface SkillsEmptyStateProps {
  onCreateBehavior: () => void;
}

export function SkillsEmptyState({ onCreateBehavior }: SkillsEmptyStateProps) {
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
