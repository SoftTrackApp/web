import classes from './templates-dialog.module.css';
import { useEffect, useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import { DotsMenu } from './dots-menu';
import type { Behavior, SkillTemplate } from '../model/types';

interface BehaviorEditorProps {
  behavior: Behavior;
  templates: SkillTemplate[];
  onTemplatesChange: (list: SkillTemplate[]) => void;
  onSubmit: (values: { name: string; skills: string[] }) => void;
  onClose: () => void;
}

export function BehaviorEditor({
  behavior,
  templates,
  onTemplatesChange,
  onSubmit,
  onClose,
}: BehaviorEditorProps) {
  const [skills, setSkills] = useState(() => behavior.skills.map((skill) => skill.name));
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const visible = templates.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const commitName = () => {
    const name = draftName.trim();

    if (editingId && name) {
      onTemplatesChange(
        templates.map((item) => (item.id === editingId ? { ...item, name } : item)),
      );
    }

    setEditingId(null);
  };

  const createTemplate = () => {
    const template = { id: crypto.randomUUID(), name: 'Новый soft skill' };
    onTemplatesChange([...templates, template]);
    setEditingId(template.id);
    setDraftName(template.name);
  };

  const addSkill = (name: string) => {
    if (skills.includes(name)) return;
    setSkills((state) => [...state, name]);
  };

  const addFirstFreeSkill = () => {
    const next = templates.find((template) => !skills.includes(template.name));
    addSkill(next ? next.name : 'Новый soft skill');
  };

  return (
    <div className={classes.overlay} onMouseDown={onClose}>
      <div className={classes.panel} onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className={classes.close} onClick={onClose} aria-label="Закрыть">
          <X size={20} />
        </button>

        <div className={classes.left}>
          <div className={classes.head}>
            <span className={classes.title}>Шаблоны soft skills</span>
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
              <div key={template.id} className={classes.item}>
                {editingId === template.id ? (
                  <input
                    className={classes.itemName}
                    value={draftName}
                    autoFocus
                    onChange={(event) => setDraftName(event.target.value)}
                    onBlur={commitName}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') commitName();
                    }}
                  />
                ) : (
                  <button
                    type="button"
                    className={classes.itemName}
                    onClick={() => addSkill(template.name)}
                  >
                    {template.name}
                  </button>
                )}

                <DotsMenu
                  className={classes.dots}
                  items={[
                    {
                      label: 'Отредактировать',
                      onSelect: () => {
                        setEditingId(template.id);
                        setDraftName(template.name);
                      },
                    },
                    {
                      label: 'Удалить',
                      onSelect: () =>
                        onTemplatesChange(templates.filter((item) => item.id !== template.id)),
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
            <span className={classes.name}>{behavior.name}</span>
          </div>

          <div className={classes.skills}>
            {skills.map((skill, index) => (
              <div key={`${skill}-${index}`} className={classes.skill}>
                <span className={classes.skillName}>{skill}</span>

                <button
                  type="button"
                  className={classes.skillRemove}
                  onClick={() => setSkills((state) => state.filter((_, i) => i !== index))}
                  aria-label="Убрать"
                >
                  <X size={16} strokeWidth={1.33} />
                </button>
              </div>
            ))}
          </div>

          <button type="button" className={classes.addSkill} onClick={addFirstFreeSkill}>
            <Plus size={16} strokeWidth={1.33} />
            Добавить soft skill
          </button>

          <button
            type="button"
            className={classes.submit}
            onClick={() => onSubmit({ name: behavior.name, skills })}
          >
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
}
