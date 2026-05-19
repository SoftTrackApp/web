import classes from './skill-sidebar.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import { ChartBarBig, MessageCircle, X } from 'lucide-react';
import { CommentCard } from './comment-card';
import { useBehaviorStats, type SoftskillStat } from '@/entities/statistics';
import { useRecords } from '@/entities/record';

interface SkillSidebarProps {
  userId: string;
  skill: SoftskillStat;
  roundedBorder?: boolean;
  onClose?: () => void;
}

type Tab = 'rates' | 'comments';

export function SkillSidebar({ userId, skill, roundedBorder = true, onClose }: SkillSidebarProps) {
  const [tab, setTab] = useState<Tab>('rates');

  const behaviors = useBehaviorStats(userId, skill.id);
  const records = useRecords(userId);

  const comments = records.data?.content.map((r) => r.comment) ?? [];

  if (!behaviors.data || !records.data) return null;

  return (
    <div className={clsx(classes.sidebar, roundedBorder && classes.roundedBorder)}>
      <div className={classes.header}>
        <h1 className={classes.title}>{skill.name}</h1>
        <X className={classes.close} onClick={onClose} />
      </div>

      <span className={classes.rates}>
        <span className={classes.ratesNum}>{skill.totalCount}</span> отметок
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

            {behaviors.data.map((b) => (
              <div key={b.id} className={classes.behavior}>
                <div className={classes.behaviorHeader}>
                  <span>{b.name}</span>
                  <span>{b.count}</span>
                </div>

                <div className={classes.barWrapper}>
                  <div className={classes.bar} style={{ width: '100%' }} />
                </div>
              </div>
            ))}

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

            {comments.map((comment, i) => (
              <CommentCard key={i} comment={comment} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
