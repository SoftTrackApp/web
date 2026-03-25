import { Input } from '@/shared/ui';
import classes from './control-board.module.css';

export function ControlBoard() {
  return (
    <div className={classes.container}>
      <section className={classes.usersSection}>
        <Input type="text" placeholder="Найти..." role="search" />
      </section>
    </div>
  );
}
