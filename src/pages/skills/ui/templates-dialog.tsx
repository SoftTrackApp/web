import classes from './templates-dialog.module.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Pencil, Plus, Search, X } from 'lucide-react';
import { DotsMenu } from './dots-menu';
import type { BehaviorTemplate, SkillTemplate } from '../model/types';

interface TemplatesDialogProps {
  templates: BehaviorTemplate[];
  onTemplatesChange: (list: BehaviorTemplate[]) => void;
  skillTemplates: SkillTemplate[];
  onSubmit: (values: { name: string; skills: string[] }) => void;
  onClose: () => void;
}

export function TemplatesDialog({
  templates,
  onTemplatesChange,
  skillTemplates,
  onSubmit,
  onClose,
}: TemplatesDialogProps) {
  const [selectedId, setSelectedId] = useState<string | null>(templates[0]?.id ?? null);
  const [name, setName] = useState(templates[0]?.name ?? '');
  const [skills, setSkills] = useState<string[]>(templates[0]?.skills ?? []);
  const [editing, setEditing] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const select = (template: BehaviorTemplate) => {
    setSelectedId(template.id);
    setName(template.name);
    setSkills(template.skills);
  };

  const editTemplate = (template: BehaviorTemplate) => {
    select(template);
    setEditing(true);
  };

  const removeTemplate = (id: string) => {
    const next = templates.filter((item) => item.id !== id);
    onTemplatesChange(next);

    if (selectedId === id && next[0]) {
      select(next[0]);
    }
  };

  const createTemplate = () => {
    const template = { id: crypto.randomUUID(), name: 'Новый шаблон', skills: [] };
    onTemplatesChange([...templates, template]);
    setSelectedId(template.id);
    setName(template.name);
    setSkills([]);
    setEditing(true);
    setQuery('');
  };

  const addSkill = () => {
    const used = new Set(skills);
    const next = skillTemplates.find((template) => !used.has(template.name));
    setSkills((state) => [...state, next ? next.name : 'Новый soft skill']);
  };

  const submit = () => {
    if (editing) {
      onTemplatesChange(
        templates.map((item) =>
          item.id === selectedId ? { ...item, name, skills } : item,
        ),
      );
      setEditing(false);
      return;
    }

    onSubmit({ name, skills });
  };

  const visible = templates.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className={classes.overlay} onMouseDown={onClose}>
      <div className={classes.panel} onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className={classes.close} onClick={onClose} aria-label="Закрыть">
          <X size={20} />
        </button>

        <div className={classes.left}>
          <div className={classes.head}>
            <span className={classes.title}>Шаблоны поведений</span>
            <button type="button" className={classes.create} onClick={createTemplate}>
              <Plus size={16} strokeWidth={1.33} />
              Создать
            </button>
          </div>

          <label className={classes.search}>
            <Search size={20} />
            <input
              className={classes.input}
              placeholder="Найти..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className={classes.list}>
            {visible.map((template) => (
              <div
                key={template.id}
                className={clsx(classes.item, template.id === selectedId && classes.itemActive)}
              >
                <button
                  type="button"
                  className={classes.itemName}
                  onClick={() => select(template)}
                >
                  {template.name}
                </button>

                <DotsMenu
                  className={classes.dots}
                  items={[
                    {
                      label: 'Отредактировать',
                      onSelect: () => editTemplate(template),
                    },
                    {
                      label: 'Удалить',
                      onSelect: () => removeTemplate(template.id),
                    },
                  ]}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={classes.right}>
          <span className={classes.subtitle}>Состав шаблона</span>

          <div className={classes.nameRow}>
            <span className={classes.name}>{name}</span>

            {!editing && (
              <button type="button" className={classes.edit} onClick={() => setEditing(true)}>
                <Pencil size={16} strokeWidth={1.33} />
                Редактировать
              </button>
            )}
          </div>

          <div className={classes.skills}>
            {skills.map((skill, index) => (
              <div key={`${skill}-${index}`} className={classes.skill}>
                <span className={classes.skillName}>{skill}</span>

                {editing && (
                  <button
                    type="button"
                    className={classes.skillRemove}
                    onClick={() => setSkills((state) => state.filter((_, i) => i !== index))}
                    aria-label="Убрать"
                  >
                    <X size={16} strokeWidth={1.33} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <button type="button" className={classes.addSkill} onClick={addSkill}>
              <Plus size={16} strokeWidth={1.33} />
              Добавить soft skill
            </button>
          )}

          <button type="button" className={classes.submit} onClick={submit}>
            {editing ? (
              'Сохранить изменения'
            ) : (
              <>
                <Plus size={20} />
                Добавить в доску
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
