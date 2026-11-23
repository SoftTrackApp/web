import classes from './skills-page.module.css';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { BehaviorCard } from './behavior-card';
import { BehaviorEditor } from './behavior-editor';
import { LibraryIcon } from './library-icon';
import { SkillTabs } from './skill-tabs';
import { TemplatesDialog } from './templates-dialog';
import { useBehaviorTemplates, useSkillSets, useSkillTemplates } from '../model/hooks';
import type {
  Behavior,
  BehaviorTemplate,
  Skill,
  SkillSet,
  SkillTemplate,
} from '../model/types';

const toSkills = (names: string[]): Skill[] =>
  names.map((name, index) => ({ id: `${name}-${index}`, name }));

export function SkillsPage() {
  const skillSets = useSkillSets();
  const skillTemplates = useSkillTemplates();
  const behaviorTemplates = useBehaviorTemplates();

  const [sets, setSets] = useState<SkillSet[] | null>(null);
  const [skillTemplateList, setSkillTemplateList] = useState<SkillTemplate[] | null>(null);
  const [behaviorTemplateList, setBehaviorTemplateList] = useState<BehaviorTemplate[] | null>(
    null,
  );
  const [activeId, setActiveId] = useState(skillSets.data[0]?.id ?? '');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const templates = skillTemplateList ?? skillTemplates.data;
  const library = behaviorTemplateList ?? behaviorTemplates.data;
  const list = sets ?? skillSets.data;
  const activeSet = list.find((set) => set.id === activeId) ?? list[0];
  const editing = activeSet?.behaviors.find((behavior) => behavior.id === editingId);

  const replaceSet = (id: string, next: SkillSet) => {
    setSets(list.map((set) => (set.id === id ? next : set)));
  };

  const updateBehaviors = (behaviors: Behavior[]) => {
    if (!activeSet) return;
    replaceSet(activeSet.id, { ...activeSet, behaviors });
  };

  const createSet = () => {
    const set: SkillSet = { id: crypto.randomUUID(), name: 'Новый набор', behaviors: [] };
    setSets([...list, set]);
    setActiveId(set.id);
  };

  const removeSet = (id: string) => {
    const next = list.filter((set) => set.id !== id);
    setSets(next);

    if (id === activeSet?.id) {
      setActiveId(next[0]?.id ?? '');
    }
  };

  const openTemplates = () => {
    setEditingId(null);
    setDialogOpen(true);
  };

  const openBehavior = (id: string) => {
    setEditingId(id);
  };

  const submitBehavior = ({ skills }: { name: string; skills: string[] }) => {
    if (!editing) return;

    updateBehaviors(
      activeSet?.behaviors.map((behavior) =>
        behavior.id === editing.id ? { ...behavior, skills: toSkills(skills) } : behavior,
      ) ?? [],
    );
    setEditingId(null);
  };

  const addFromLibrary = ({ name, skills }: { name: string; skills: string[] }) => {
    updateBehaviors([
      ...(activeSet?.behaviors ?? []),
      { id: crypto.randomUUID(), name, skills: toSkills(skills) },
    ]);

    setDialogOpen(false);
  };

  return (
    <div className={classes.page}>
      <div className={classes.head}>
        <h1 className={classes.title}>Библиотека навыков</h1>
      </div>

      <div className={classes.toolbar}>
        <SkillTabs
          sets={list}
          activeId={activeSet?.id ?? ''}
          onSelect={setActiveId}
          onCreate={createSet}
          onDelete={removeSet}
        />

        <div className={classes.library}>
          <button type="button" className={classes.libraryButton} onClick={openTemplates}>
            <LibraryIcon />
            Библиотека шаблонов
          </button>
        </div>
      </div>

      <div className={classes.grid}>
        {activeSet?.behaviors.map((behavior) => (
          <BehaviorCard
            key={behavior.id}
            behavior={behavior}
            templates={templates}
            onTemplatesChange={setSkillTemplateList}
            onEdit={() => openBehavior(behavior.id)}
            onRemove={() =>
              updateBehaviors(activeSet.behaviors.filter((item) => item.id !== behavior.id))
            }
            onSkillsChange={(skills) =>
              updateBehaviors(
                activeSet.behaviors.map((item) =>
                  item.id === behavior.id ? { ...item, skills } : item,
                ),
              )
            }
          />
        ))}

        {activeSet && (
          <button type="button" className={classes.tile} onClick={openTemplates}>
            Создать поведение
            <Plus size={32} />
          </button>
        )}
      </div>

      {dialogOpen && (
        <TemplatesDialog
          templates={library}
          onTemplatesChange={setBehaviorTemplateList}
          skillTemplates={templates}
          onSubmit={addFromLibrary}
          onClose={() => setDialogOpen(false)}
        />
      )}

      {editing && (
        <BehaviorEditor
          behavior={editing}
          templates={templates}
          onTemplatesChange={setSkillTemplateList}
          onSubmit={submitBehavior}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  );
}
