import classes from './dashboard-page.module.css';
import { Typography } from '@/shared/ui/typography';
import { Select } from '@/shared/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { UserEntity } from '@/entities/user';
import { useEffect, useState } from 'react';
import { EmptyUserState } from './empty-user-state';

type Option = {
  label: string;
  value: string;
};

const sortOptions: Option[] = [
  { label: 'По названию (А-Я)', value: 'alpha' },
  { label: 'По возрастанию баллов', value: 'score-high' },
  { label: 'По убыванию баллов', value: 'score-low' },
];

export function DashboardPage() {
  const dispatch = useDispatch();

  const [user, setUser] = useState<Option | null>(null);
  const [sort, setSort] = useState<Option>(sortOptions[0]);

  const users = useSelector(UserEntity.selectors.selectUsers);

  useEffect(() => {
    dispatch(UserEntity.actions.fetchUsers());
  }, [dispatch]);

  return (
    <div className={classes.wrapper}>
      <Typography variant="h2" className={classes.title}>
        Статистика
      </Typography>

      <div className={classes.filters}>
        <Select
          placeholder="Выберите ученика"
          options={users.data.map((u) => ({ label: `${u.lName} ${u.fName}`, value: u.id }))}
          onChange={(e) => setUser(e as Option)}
        />
        <Select value={sort} onChange={(e) => setSort(e as Option)} options={sortOptions} />
      </div>

      {user ? <div></div> : <EmptyUserState />}
    </div>
  );
}
