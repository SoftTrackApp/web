import classes from './skills-page.module.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { MoreVertical, Plus } from 'lucide-react';
import { useBehaviorSets } from '@/entities/behavior-set';
import {
  CreateSkillDialog,
  CreateBehaviorDialog,
  TemplatesLibrary,
} from '@/features/skills';

export function SkillsPage() {
  const behaviorSets = useBehaviorSets();
  const [selectedTab, setSelectedTab] = useState(0);
  const [dialog, setDialog] = useState<'skill' | 'behavior' | 'library' | null>(null);
  const [editing, setEditing] = useState<{ name: string; description?: string } | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const sets = behaviorSets.data ?? [];
  const [orderedSets, setOrderedSets] = useState(sets);

  useEffect(() => {
    setOrderedSets(sets);
  }, [sets]);

  const tabs = ['Базовый набор', 'Русский язык', 'Русский язык', 'Русский язык'];

  const dropCard = (target: number) => {
    if (dragIndex === null) return;
    setOrderedSets((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(target, 0, moved);
      return next;
    });
    setDragIndex(null);
    setOverIndex(null);
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Настройка навыков</h1>

      {behaviorSets.isLoading && (
        <div className={classes.cardsRow}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={classes.skeletonCard}>
              <div className={classes.skeletonTitle} />
              <div className={classes.skeletonLine} />
              <div className={classes.skeletonRow} />
              <div className={classes.skeletonRow} />
            </div>
          ))}
        </div>
      )}

      {behaviorSets.isError && <span className={classes.error}>Не удалось загрузить навыки</span>}

      <div className={classes.tabsRow}>
        {tabs.map((tab, index) => (
          <button
            key={`${tab}-${index}`}
            className={clsx(classes.tab, index === selectedTab && classes.tabActive)}
            onClick={() => setSelectedTab(index)}
          >
            {tab}
          </button>
        ))}

        <button
          className={classes.tabPlus}
          onClick={() => {
            setEditing(null);
            setDialog('skill');
          }}
          aria-label="Добавить навык"
        >
          <Plus size={18} />
        </button>

        <button
          className={classes.library}
          onClick={() => {
            setEditing(null);
            setDialog('library');
          }}
        >
          <span className={classes.libraryDot} />
          Библиотека шаблонов
        </button>
      </div>

      {orderedSets.length === 0 && !behaviorSets.isLoading && (
        <div className={classes.emptyState}>
          <span className={classes.emptyTitle}>Здесь пока пусто</span>
          <span className={classes.emptyText}>Добавьте первое поведение</span>
          <button className={classes.emptyButton} onClick={() => setDialog('behavior')}>
            <Plus size={14} />
            Создать поведение
          </button>
        </div>
      )}

      {orderedSets.length > 0 && (
        <div className={classes.cardsRow}>
          {orderedSets.map((set, index) => (
            <SetCard
              key={set.id}
              name={set.name}
              behaviors={set.behaviors}
              draggable={dragIndex === null}
              isDragged={dragIndex === index}
              isOver={overIndex === index && dragIndex !== index}
              onDragStart={() => setDragIndex(index)}
              onDragEnd={() => {
                setDragIndex(null);
                setOverIndex(null);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                if (dragIndex !== null && index !== dragIndex) setOverIndex(index);
              }}
              onDrop={() => dropCard(index)}
              onAdd={() => {
                setEditing(null);
                setDialog('skill');
              }}
              onEdit={() => {
                setEditing({ name: set.name });
                setDialog('skill');
              }}
            />
          ))}

          <button className={classes.createCard} onClick={() => setDialog('behavior')}>
            <span className={classes.createCardText}>Создать поведение</span>
            <Plus size={38} strokeWidth={2.5} className={classes.createCardPlus} />
          </button>
        </div>
      )}

      {dialog === 'skill' && (
        <CreateSkillDialog
          initialName={editing?.name}
          initialDescription={editing?.description}
          onClose={() => {
            setEditing(null);
            setDialog(null);
          }}
        />
      )}
      {dialog === 'behavior' && (
        <CreateBehaviorDialog
          skillName={tabs[selectedTab] ?? '—'}
          initialName={editing?.name}
          initialDescription={editing?.description}
          onClose={() => {
            setEditing(null);
            setDialog(null);
          }}
        />
      )}
      {dialog === 'library' && <TemplatesLibrary onClose={() => setDialog(null)} />}
    </div>
  );
}

function SetCard({
  name,
  behaviors,
  onAdd,
  onEdit,
  draggable,
  isDragged,
  isOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: {
  name: string;
  behaviors: { id: number; name: string }[];
  onAdd: () => void;
  onEdit: () => void;
  draggable: boolean;
  isDragged: boolean;
  isOver: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
}) {
  return (
    <section
      className={clsx(classes.card, isDragged && classes.cardDragged, isOver && classes.cardOver)}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className={classes.cardHeader}>
        <span className={classes.cardName}>{name}</span>
        <DotsMenu onEdit={onEdit} />
      </div>

      <button className={classes.addSkill} onClick={onAdd}>
        <Plus size={14} />
        Добавить soft skill
      </button>

      <div className={classes.rows}>
        {behaviors.map((behavior) => (
          <div key={behavior.id} className={classes.row}>
            <span className={classes.rowName}>{behavior.name}</span>
            <DotsMenu onEdit={onEdit} />
          </div>
        ))}
      </div>
    </section>
  );
}

function DotsMenu({ onEdit }: { onEdit?: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.dotsWrap}>
      <button className={classes.dots} onClick={() => setOpen(!open)} aria-label="Меню">
        <MoreVertical size={14} />
      </button>
      {open && (
        <div className={classes.menu} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => {
              setOpen(false);
              onEdit?.();
            }}
          >
            Редактировать
          </button>
          <button className={classes.menuDanger} onClick={() => setOpen(false)}>
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}
