import classes from './participants-skeleton.module.css';

export function ParticipantsSkeleton() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.head}>
        <span className={classes.headInner} />
        <span className={classes.headInner} />
        <span className={classes.headInner} />
        <span />
      </div>

      {[0, 1, 2, 3, 4, 5].map((row) => (
        <div key={row} className={classes.row}>
          <span className={classes.cell}>
            <span className={classes.name} />
          </span>
          <span className={classes.cell}>
            <span className={classes.badge} />
          </span>
          <span className={classes.cell}>
            <span className={classes.chip} />
          </span>
          <span className={classes.cell} />
        </div>
      ))}
    </div>
  );
}
