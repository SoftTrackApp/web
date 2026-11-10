import classes from './skills-page.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import { MoreVertical, Plus } from 'lucide-react';
import { useBehaviorSets } from '@/entities/behavior-set';
import { CreateSkillDialog, CreateBehaviorDialog } from '@/features/skills';

export function SkillsPage() {
  const behaviorSets = useBehaviorSets();
  const [selectedTab, setSelectedTab] = useState(0);
  const [dialog, setDialog] = useState<'skill' | 'behavior' | null>(null);
  const [editing, setEditing] = useState<{ name: string; description?: string } | null>(null);

  const sets = behaviorSets.data ?? [];
  const tabs = ['Базовый набор', 'Русский язык', 'Русский язык', 'Русский язык'];

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Настройка навыков</h1>

      {behaviorSets.isLoading && <span className={classes.loading}>Загрузка...</span>}
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
            setDialog('skill');
          }}
        >
          <span className={classes.libraryDot} />
          Библиотека шаблонов
        </button>
      </div>

      <div className={classes.cardsRow}>
        {sets.map((set) => (
          <SetCard
            key={set.id}
            name={set.name}
            behaviors={set.behaviors}
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
    </div>
  );
}

function SetCard({
  name,
  behaviors,
  onAdd,
  onEdit,
}: {
  name: string;
  behaviors: { id: number; name: string }[];
  onAdd: () => void;
  onEdit: () => void;
}) {
  return (
    <section className={classes.card}>
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
