import classes from './skill-sidebar.module.css';
import { useState } from 'react';
import { X } from 'lucide-react';
import type { Skill } from '../model/skill';
import { CommentCard } from './comment-card';
import clsx from 'clsx';

interface SkillSidebarProps {
  skill: Skill;
  onClose?: () => void;
}

type Tab = 'rates' | 'comments';

export function SkillSidebar({ skill, onClose }: SkillSidebarProps) {
  const [tab, setTab] = useState<Tab>('rates');

  return (
    <div className={classes.sidebar}>
      <div className={classes.header}>
        <h1 className={classes.title}>{skill.title}</h1>
        <X className={classes.close} onClick={onClose} />
      </div>

      <span className={classes.rates}>
        <span className={classes.ratesNum}>{skill.rates}</span> отметок
      </span>

      <div className={classes.switch}>
        <div
          className={clsx(classes.switchButton, tab === 'rates' && classes.selectedButton)}
          onClick={() => setTab('rates')}
        >
          Показатели
        </div>
        <div
          className={clsx(classes.switchButton, tab === 'comments' && classes.selectedButton)}
          onClick={() => setTab('comments')}
        >
          Комментарии
        </div>
      </div>

      <div className={classes.data}>
        {tab === 'rates' ? (
          <>
            <h2 className={classes.subtitle}>Распределение поведений</h2>

            <div className={classes.behavior}>
              <div className={classes.behaviorHeader}>
                <span>Слушал на уроке</span>
                <span>15</span>
              </div>

              <div className={classes.bar} style={{ width: '100%' }} />
            </div>

            <div className={classes.behavior}>
              <div className={classes.behaviorHeader}>
                <span>Активно обсуждал</span>
                <span>10</span>
              </div>

              <div className={classes.bar} style={{ width: '80%' }} />
            </div>
          </>
        ) : (
          <>
            <h2 className={classes.subtitle}>Комментарии к навыкам</h2>

            {skill.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
