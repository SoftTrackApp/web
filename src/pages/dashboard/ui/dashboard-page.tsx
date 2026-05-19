import classes from './dashboard-page.module.css';
import { Typography } from '@/shared/ui/typography';
import { Select } from '@/shared/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { UserEntity } from '@/entities/user';
import { useEffect, useMemo, useState } from 'react';
import { EmptyUserState } from './empty-user-state';
import { useSoftskillStats, type SoftskillStat } from '@/entities/statistics';
import { SkillCard } from './skill-card';
import { SkillSidebar } from './skill-sidebar';

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

  const [skill, setSkill] = useState<SoftskillStat | null>(null);

  const softskillStats = useSoftskillStats(user?.value);

  const totalRates = softskillStats.data?.reduce((sum, s) => sum + s.totalCount, 0) ?? 0;

  const users = useSelector(UserEntity.selectors.selectUsers);

  const sortedSkills = useMemo(() => {
    if (!softskillStats.data) return [];

    const copy = [...softskillStats.data];

    switch (sort) {
      case sortOptions[0]:
        copy.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case sortOptions[1]:
        copy.sort((a, b) => a.totalCount - b.totalCount);
        break;

      case sortOptions[2]:
        copy.sort((a, b) => b.totalCount - a.totalCount);
        break;
    }

    return copy;
  }, [sort, softskillStats.data]);

  useEffect(() => {
    dispatch(UserEntity.actions.fetchUsers());
  }, [dispatch]);

  return (
    <div className={classes.wrapper}>
      <title>Статистика - SoftTrack</title>

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

      {softskillStats.data ? (
        softskillStats.data?.length === 0 ? (
          <span>Нет данных для отображения</span>
        ) : (
          <div className={classes.skills}>
            {sortedSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                maxRates={totalRates}
                onClick={() => setSkill(skill)}
              />
            ))}
          </div>
        )
      ) : (
        <EmptyUserState />
      )}

      {skill && (
        <SkillSidebar userId={user?.value || ''} skill={skill} onClose={() => setSkill(null)} />
      )}
    </div>
  );
}
