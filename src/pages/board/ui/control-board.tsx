import classes from './control-board.module.css';
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { UserEntity } from '@/entities/user';

export function ControlBoard() {
  const [searchText, setSearchText] = useState('');

  const { users, loading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    const query = searchText.toLowerCase();

    return users.filter((u) =>
      (u.name.toLowerCase() + ' ' + u.surname.toLowerCase()).includes(query),
    );
  }, [users, searchText]);

  useEffect(() => {
    dispatch(UserEntity.actions.fetchUsers());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <section className={classes.usersSection}>
        <div className={classes.search}>
          <Input
            type="text"
            placeholder="Найти..."
            role="search"
            icon={<Search size={16} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>{error}</span>
        ) : (
          <div className={classes.userList}>
            {filteredUsers.map((user) => (
              <div key={user.id} className={classes.userCard}>
                {user.name} {user.surname}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
