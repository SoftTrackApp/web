import classes from './templates-library.module.css';
import clsx from 'clsx';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Plus, Search } from 'lucide-react';
import { DotsMenu } from './dots-menu';
import type { SkillTemplate } from '../model/types';

interface TemplatesLibraryProps {
  templates: SkillTemplate[];
  onChange: (list: SkillTemplate[]) => void;
  trigger: ReactNode;
  triggerClassName?: string;
  align?: 'start' | 'end';
  onSelect?: (template: SkillTemplate) => void;
}

export function TemplatesLibrary({
  templates,
  onChange,
  trigger,
  triggerClassName,
  align = 'start',
  onSelect,
}: TemplatesLibraryProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftName, setDraftName] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onMouseDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, [open]);

  const visible = templates.filter((item) =>
    item.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const commitName = () => {
    const name = draftName.trim();

    if (editingId && name) {
      onChange(templates.map((item) => (item.id === editingId ? { ...item, name } : item)));
    }

    setEditingId(null);
  };

  const create = () => {
    const template = { id: crypto.randomUUID(), name: 'Новый soft skill' };
    onChange([...templates, template]);
    setEditingId(template.id);
    setDraftName(template.name);
  };

  return (
    <div className={classes.root} ref={rootRef}>
      <button
        type="button"
        className={clsx(classes.trigger, triggerClassName)}
        onClick={() => setOpen((state) => !state)}
      >
        {trigger}
      </button>

      {open && (
        <div
          className={clsx(classes.panel, align === 'end' ? classes.panelEnd : classes.panelStart)}
        >
          <div className={classes.head}>
            <span className={classes.title}>Шаблоны soft skills</span>
            <button type="button" className={classes.create} onClick={create}>
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
              <div key={template.id} className={classes.row}>
                {editingId === template.id ? (
                  <input
                    className={classes.rowInput}
                    value={draftName}
                    autoFocus
                    onChange={(event) => setDraftName(event.target.value)}
                    onBlur={commitName}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') commitName();
                    }}
                  />
                ) : onSelect ? (
                  <button
                    type="button"
                    className={classes.rowName}
                    onClick={() => {
                      onSelect(template);
                      setOpen(false);
                    }}
                  >
                    {template.name}
                  </button>
                ) : (
                  <span className={classes.rowName}>{template.name}</span>
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
                        onChange(templates.filter((item) => item.id !== template.id)),
                    },
                  ]}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
