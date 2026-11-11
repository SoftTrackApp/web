import classes from './skills-page.module.css';
import { useState } from 'react';
import { useBehaviorSets } from '@/entities/behavior-set';
import {
  CreateSkillDialog,
  CreateBehaviorDialog,
  TemplatesLibrary,
} from '@/features/skills';
import { SkillTabs } from '@/widgets/skill-tabs';
import { SkillsCards } from '@/widgets/skills-cards';

const tabs = ['Базовый набор', 'Русский язык', 'Русский язык', 'Русский язык'];

export function SkillsPage() {
  const behaviorSets = useBehaviorSets();

  const [selectedTab, setSelectedTab] = useState(0);
  const [dialog, setDialog] = useState<'skill' | 'behavior' | 'library' | null>(null);
  const [editing, setEditing] = useState<{ name: string; description?: string } | null>(null);

  const sets = behaviorSets.data ?? [];

  const openSkill = (name?: string, description?: string) => {
    setEditing(name ? { name, description } : null);
    setDialog('skill');
  };

  const openBehavior = (name?: string, description?: string) => {
    setEditing(name ? { name, description } : null);
    setDialog('behavior');
  };

  const closeDialog = () => {
    setEditing(null);
    setDialog(null);
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Настройка навыков</h1>

      <SkillTabs
        tabs={tabs}
        selectedTab={selectedTab}
        onSelect={setSelectedTab}
        onAddTab={() => openSkill()}
        onOpenLibrary={() => {
          setEditing(null);
          setDialog('library');
        }}
      />

      {behaviorSets.isError && (
        <span className={classes.error}>Не удалось загрузить навыки</span>
      )}

      <SkillsCards
        sets={sets}
        isLoading={behaviorSets.isLoading}
        onAddSkill={() => openSkill()}
        onEditSkill={(set) => openSkill(set.name)}
        onCreateBehavior={() => openBehavior()}
      />

      {dialog === 'skill' && (
        <CreateSkillDialog
          initialName={editing?.name}
          initialDescription={editing?.description}
          onClose={closeDialog}
        />
      )}

      {dialog === 'behavior' && (
        <CreateBehaviorDialog
          skillName={tabs[selectedTab] ?? '—'}
          initialName={editing?.name}
          initialDescription={editing?.description}
          onClose={closeDialog}
        />
      )}

      {dialog === 'library' && <TemplatesLibrary onClose={closeDialog} />}
    </div>
  );
}
