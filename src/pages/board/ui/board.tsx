import classes from './board.module.css';
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/shared/ui';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { UserEntity } from '@/entities/user';
import { BoardEntity } from '@/entities/board';
import clsx from 'clsx';

export function Board() {
  const [searchText, setSearchText] = useState('');

  const { board } = useAppSelector((state) => state.board);
  const { behaviorSets } = useAppSelector((state) => state.behaviorSets);
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

  if (!behaviorSets || !board || !users) {
    return null;
  }

  const behaviorSet = behaviorSets.find((bs) => bs.id === board.behaviorSetId);
  const selectedUser = users.find((u) => u.id === board.selectedUserId);

  if (!behaviorSet) {
    return <span>Набор поведений не найден!</span>;
  }

  return (
    <div className={classes.container}>
      <section className={classes.section}>
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
          <div className={classes.userList} role="list">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={clsx(
                  classes.userCard,
                  user.id === board.selectedUserId && classes.selectedUser,
                )}
                onClick={() => dispatch(BoardEntity.actions.setSelectedUserId(user.id))}
                role="listitem"
              >
                {user.name} {user.surname}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={classes.middleSection}>
        <div className={classes.middleHeader}>
          {!selectedUser ? (
            <span>Выберите пользователя</span>
          ) : (
            <>
              <h1 className={classes.name}>
                {selectedUser.name} {selectedUser.surname}
              </h1>
              <span className={classes.description}>
                Группа {board.group} &bull; {board.name}
              </span>
            </>
          )}
        </div>
      </section>

      <section className={classes.section}>
        <div className={classes.behaviorsHeader}>
          <h1 className={classes.behaviorsTitle}>Набор поведений</h1>
          <h2 className={classes.behaviorsName}>{behaviorSet.name}</h2>
        </div>

        <div className={classes.behaviorList} role="list">
          {behaviorSet.behaviors.map((b, i) => (
            <div key={i} className={classes.behaviorCard} role="listitem">
              {b.name}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
