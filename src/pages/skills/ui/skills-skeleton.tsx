import classes from './skills-skeleton.module.css';

export function SkillsSkeleton() {
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
