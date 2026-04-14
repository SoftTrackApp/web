import classes from './dashboard-page.module.css';
import { Select } from '@/shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import { UserFeature } from '@/features/user';
import { useEffect, useMemo, useState } from 'react';
import { SkillCard } from './skill-card';

type Sort = 'alpha' | 'high-score' | 'low-score';

const skills = [
  { title: 'Коммуникация', rates: 15 },
  { title: 'Работа в команде', rates: 10 },
  { title: 'Вербальная коммуникация', rates: 5 },
];

export function DashboardPage() {
  const dispatch = useDispatch();

  const { users } = useSelector(UserFeature.selectors.selectUsers);

  const [userId, setUserId] = useState<number | null>(null);
  const [sort, setSort] = useState<Sort>('alpha');

  const selectedUser = users.find((u) => u.id === userId) || users[0] || null;

  const sortedSkills = useMemo(() => {
    const copy = [...skills];

    switch (sort) {
      case 'alpha':
        copy.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'high-score':
        copy.sort((a, b) => b.rates - a.rates);
        break;

      case 'low-score':
        copy.sort((a, b) => a.rates - b.rates);
        break;
    }

    return copy;
  }, [sort]);

  useEffect(() => {
    dispatch(UserFeature.actions.fetchUsers());
  }, [dispatch]);

  if (users.length === 0) return null;

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Статистика</h1>

      <div className={classes.filters}>
        <Select className={classes.select} onChange={(e) => setUserId(Number(e.target.value))}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.surname} {user.name}
            </option>
          ))}
        </Select>

        <Select
          className={classes.select}
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
        >
          <option value="alpha">По названию (А-Я)</option>
          <option value="high-score">Сначала высокие баллы</option>
          <option value="low-score">Сначала низкие баллы</option>
        </Select>
      </div>

      <span>
        Выбранный пользователь: {selectedUser.surname} {selectedUser.name}
      </span>

      <div className={classes.skills}>
        {sortedSkills.map((skill) => (
          <SkillCard key={skill.title} title={skill.title} rates={skill.rates} maxRates={15} />
        ))}
      </div>
    </div>
  );
}
