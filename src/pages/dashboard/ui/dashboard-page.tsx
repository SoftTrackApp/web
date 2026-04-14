import classes from './dashboard-page.module.css';
import { Select } from '@/shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import { UserFeature } from '@/features/user';
import { useEffect, useState } from 'react';
import { SkillCard } from './skill-card';

export function DashboardPage() {
  const dispatch = useDispatch();

  const { users } = useSelector(UserFeature.selectors.selectUsers);

  const [userId, setUserId] = useState<number | null>(null);
  const selectedUser = users.find((u) => u.id === userId) || users[0];

  useEffect(() => {
    dispatch(UserFeature.actions.fetchUsers());
  }, [dispatch]);

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Статистика</h1>

      <Select className={classes.select} onChange={(e) => setUserId(Number(e.target.value))}>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.surname} {user.name}
          </option>
        ))}
      </Select>

      <div className={classes.skills}>
        <SkillCard title="Коммуникация" rates={15} maxRates={15} />
        <SkillCard title="Коммуникация" rates={8} maxRates={15} />
        <SkillCard title="Коммуникация" rates={4} maxRates={15} />
        <SkillCard title="Коммуникация" rates={2} maxRates={15} />
      </div>
    </div>
  );
}
