import classes from './dashboard-page.module.css';
import { Select } from '@/shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import { UserFeature } from '@/features/user';
import { useEffect, useMemo, useState } from 'react';
import { SkillCard } from './skill-card';
import type { Comment, Skill } from '../model/skill';
import { SkillSidebar } from './skill-sidebar';
import { ArrowUpDown } from 'lucide-react';

type Sort = 'alpha' | 'high-score' | 'low-score';

const comments: Comment[] = [
  { id: 1, author: 'Teacher 1', content: 'Comment 1', createdAt: new Date().toISOString() },
  { id: 2, author: 'Teacher 2', content: 'Comment 2', createdAt: new Date().toISOString() },
  { id: 3, author: 'Teacher 3', content: 'Comment 3', createdAt: new Date().toISOString() },
  { id: 4, author: 'Teacher 4', content: 'Comment 4', createdAt: new Date().toISOString() },
];

const skills: Skill[] = [
  { id: 1, title: 'Коммуникация', rates: 15, comments: [comments[0], comments[1]] },
  { id: 2, title: 'Работа в команде', rates: 10, comments: [comments[2], comments[3]] },
  {
    id: 3,
    title: 'Вербальная коммуникация',
    rates: 5,
    comments: [comments[0], comments[2], comments[3]],
  },
];

export function DashboardPage() {
  const dispatch = useDispatch();

  const { users } = useSelector(UserFeature.selectors.selectUsers);

  const [userId, setUserId] = useState<number | null>(null);
  const [skillIds, setSkillIds] = useState<number[]>([]);
  const [sort, setSort] = useState<Sort>('alpha');

  const selectedUser = users.find((u) => u.id === userId) || null;

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
            <option value="0">Выберите ученика</option>

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
            icon={<ArrowUpDown />}
          >
            <option value="alpha">По названию (А-Я)</option>
            <option value="high-score">По возрастанию баллов</option>
            <option value="low-score">По убыванию баллов</option>
          </Select>
        </div>

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
