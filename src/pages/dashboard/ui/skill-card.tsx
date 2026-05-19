import clsx from 'clsx';
import classes from './skill-card.module.css';
import type { SoftskillStat } from '@/features/statistics/model/types';

interface SkillCardProps {
  skill: SoftskillStat;
  maxRates?: number;
  selected?: boolean;
  onClick?: (skillId: number) => void;
}

export function SkillCard({ skill, maxRates, selected = false, onClick }: SkillCardProps) {
  const barWidth = maxRates ? Math.floor((skill.totalCount / maxRates) * 100) : 0;

  return (
    <div
      className={clsx(classes.skillCard, selected && classes.selected)}
      onClick={() => onClick && onClick(skill.id)}
    >
      <span className={classes.label}>Soft skill</span>
      <h1 className={classes.title}>{skill.name}</h1>

      <div className={classes.rates}>
        <span>
          <span className={classes.ratesCount}>{skill.totalCount}</span> отметок
        </span>

        <span className={classes.ratesPerentage}>{barWidth}%</span>
      </div>

      <div className={classes.barWrapper}>
        <div className={classes.bar} style={{ width: `${barWidth}%` }} />
      </div>
    </div>
  );
}
