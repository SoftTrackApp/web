import classes from './skill-tabs.module.css';
import clsx from 'clsx';
import { Plus } from 'lucide-react';

interface SkillTabsProps {
  tabs: string[];
  selectedTab: number;
  onSelect: (index: number) => void;
  onAddTab: () => void;
  onOpenLibrary: () => void;
}

export function SkillTabs({
  tabs,
  selectedTab,
  onSelect,
  onAddTab,
  onOpenLibrary,
}: SkillTabsProps) {
  return (
    <div className={classes.tabsRow}>
      {tabs.map((tab, index) => (
        <button
          key={`${tab}-${index}`}
          className={clsx(classes.tab, index === selectedTab && classes.tabActive)}
          onClick={() => onSelect(index)}
        >
          {tab}
        </button>
      ))}

      <button className={classes.tabPlus} onClick={onAddTab} aria-label="Добавить навык">
        <Plus size={18} />
      </button>

      <button className={classes.library} onClick={onOpenLibrary}>
        <span className={classes.libraryDot} />
        Библиотека шаблонов
      </button>
    </div>
  );
}
