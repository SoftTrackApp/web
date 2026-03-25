import { Input } from '@/shared/ui';
import classes from './control-board.module.css';

const sampleUsers = Array.from({ length: 30 }, () => 'Иван Иванов');

export function ControlBoard() {
  return (
    <div className={classes.container}>
      <section className={classes.usersSection}>
        <div className={classes.search}>
          <Input type="text" placeholder="Найти..." role="search" />
        </div>

        <div className={classes.userList}>
          {sampleUsers.map((user, i) => (
            <div key={i} className={classes.userCard}>{user}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
