import classes from './skill-tabs.module.css';
import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { DotsMenu } from './dots-menu';
import type { SkillSet } from '../model/types';

interface SkillTabsProps {
  sets: SkillSet[];
  activeId: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

export function SkillTabs({ sets, activeId, onSelect, onCreate, onDelete }: SkillTabsProps) {
  return (
    <div className={classes.tabs}>
      {sets.map((set) => (
        <div
          key={set.id}
          className={clsx(classes.tab, set.id === activeId && classes.tabActive)}
        >
          <button type="button" className={classes.tabName} onClick={() => onSelect(set.id)}>
            {set.name}
          </button>

          <DotsMenu
            className={classes.dots}
            items={[{ label: 'Удалить', onSelect: () => onDelete(set.id) }]}
          />
        </div>
      ))}

      <button type="button" className={classes.add} onClick={onCreate} aria-label="Добавить набор">
        <Plus size={16} />
      </button>
    </div>
  );
}
