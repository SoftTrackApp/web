import classes from './dashboard-page.module.css';
import { Select } from '@/shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import { UserFeature } from '@/features/user';
import { useEffect, useMemo, useState } from 'react';
import { SkillCard } from './skill-card';
import type { Skill } from '../model/skill';
import { SkillSidebar } from './skill-sidebar';

type Sort = 'alpha' | 'high-score' | 'low-score';

const skills: Skill[] = [
  { id: 1, title: 'Коммуникация', rates: 15 },
  { id: 2, title: 'Работа в команде', rates: 10 },
  { id: 3, title: 'Вербальная коммуникация', rates: 5 },
];

export function DashboardPage() {
  const dispatch = useDispatch();

  const { users } = useSelector(UserFeature.selectors.selectUsers);

  const [userId, setUserId] = useState<number | null>(null);
  const [skillIds, setSkillIds] = useState<number[]>([]);
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

  const switchSkill = (skillId: number) => {
    const skill = skills.find((s) => s.id === skillId);
    if (!skill) return;

    if (skillIds.includes(skillId)) {
      closeSkill(skillId);
    } else {
      if (skillIds.length === 2) {
        setSkillIds([skill.id, skillIds[1]]);
      } else {
        setSkillIds([skill.id, ...skillIds]);
      }
    }
  };

  const closeSkill = (skillId: number) => {
    setSkillIds(skillIds.filter((id) => id !== skillId));
  };

  useEffect(() => {
    dispatch(UserFeature.actions.fetchUsers());
  }, [dispatch]);

  if (users.length === 0) return null;

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
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
            <SkillCard
              key={skill.id}
              skill={skill}
              maxRates={15}
              selected={skillIds.includes(skill.id)}
              onClick={switchSkill}
            />
          ))}
        </div>
      </div>

      <div className={classes.sidebars}>
        {skillIds.map((id) => {
          const skill = skills.find((s) => s.id === id);
          if (!skill) return;

          return <SkillSidebar key={id} skill={skill} onClose={() => closeSkill(skill.id)} />;
        })}
      </div>
    </div>
  );
}
