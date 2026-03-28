import classes from './control-board.module.css';
import { useEffect } from 'react';
import { Input } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { UserEntity } from '@/entities/user';

export function ControlBoard() {
  const { users, loading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(UserEntity.actions.fetchUsers());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <section className={classes.usersSection}>
        <div className={classes.search}>
          <Input type="text" placeholder="Найти..." role="search" />
        </div>

        {loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>{error}</span>
        ) : users ? (
          <div className={classes.userList}>
            {users.map((user) => (
              <div key={user.id} className={classes.userCard}>
                {user.name} {user.surname}
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
