import classes from './skill-sidebar.module.css';
import { useState } from 'react';
import { ChartBarBig, MessageCircle, X } from 'lucide-react';
import type { Skill } from '../model/skill';
import { CommentCard } from './comment-card';
import clsx from 'clsx';

interface SkillSidebarProps {
  skill: Skill;
  roundedBorder?: boolean;
  onClose?: () => void;
}

type Tab = 'rates' | 'comments';

export function SkillSidebar({ skill, roundedBorder = true, onClose }: SkillSidebarProps) {
  const [tab, setTab] = useState<Tab>('rates');

  return (
    <div className={clsx(classes.sidebar, roundedBorder && classes.roundedBorder)}>
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
          <ChartBarBig />
          Показатели
        </div>

        <div
          className={clsx(classes.switchButton, tab === 'comments' && classes.selectedButton)}
          onClick={() => setTab('comments')}
        >
          <MessageCircle />
          Комментарии
        </div>
      </div>

      <div className={classes.data}>
        {tab === 'rates' ? (
          <>
            <h3 className={classes.subtitle}>Распределение поведений</h3>

            <div className={classes.behavior}>
              <div className={classes.behaviorHeader}>
                <span>Слушал на уроке</span>
                <span>15</span>
              </div>

              <div className={classes.barWrapper}>
                <div className={classes.bar} style={{ width: '100%' }} />
              </div>
            </div>

            <div className={classes.behavior}>
              <div className={classes.behaviorHeader}>
                <span>Активно обсуждал</span>
                <span>10</span>
              </div>

              <div className={classes.barWrapper}>
                <div className={classes.bar} style={{ width: '80%' }} />
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className={classes.subtitle}>Комментарии</h3>

            {skill.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
