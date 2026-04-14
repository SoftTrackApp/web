import classes from './skill-card.module.css';

interface SkillCardProps {
  title: string;
  rates: number;
  maxRates?: number;
}

export function SkillCard({ title, rates, maxRates }: SkillCardProps) {
  const barWidth = maxRates ? Math.floor((rates / maxRates) * 100) : 0;

  return (
    <div className={classes.skillCard}>
      <span className={classes.label}>Soft skill</span>
      <h1 className={classes.title}>{title}</h1>

      <div className={classes.rates}>
        <span className={classes.ratesCount}>{rates}</span> отметок
      </div>

      <div className={classes.bar} style={{ width: `${barWidth}%` }} />
    </div>
  );
}
