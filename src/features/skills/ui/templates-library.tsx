import classes from './templates-library.module.css';
import { X, Search, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Dialog } from '@/shared/ui/dialog/dialog';

const templates = [
  {
    id: 1,
    name: 'Коммуникация',
    description: 'Навыки общения и взаимодействия в команде',
    behaviors: ['Активное слушание', 'Ясная речь', 'Обратная связь'],
  },
  {
    id: 2,
    name: 'Работа в команде',
    description: 'Совместная работа над общей задачей',
    behaviors: ['Распределение ролей', 'Поддержка коллег'],
  },
  {
    id: 3,
    name: 'Критическое мышление',
    description: 'Анализ информации и принятие решений',
    behaviors: ['Анализ данных', 'Аргументация', 'Самопроверка'],
  },
];

interface TemplatesLibraryProps {
  onClose?: () => void;
}

export function TemplatesLibrary({ onClose }: TemplatesLibraryProps) {
  const [selected, setSelected] = useState(templates[0]);
  const [added, setAdded] = useState<number[]>([]);
  const [query, setQuery] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const filtered = templates.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Dialog onClose={onClose} wide>
      <div className={classes.window}>
        <div className={classes.left}>
          <div className={classes.header}>
            <span className={classes.title}>Библиотека шаблонов</span>
          </div>

          <div className={classes.createBlock}>
            <span className={classes.createLabel}>
              Создать свой софт скилл
            </span>
            <input
              className={classes.createInput}
              placeholder="Название софт скилла"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
            />
          </div>

          <div className={classes.searchWrap}>
            <Search size={14} className={classes.searchIcon} />
            <input
              className={classes.search}
              placeholder="Поиск"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className={classes.list}>
            {filtered.map((template) => (
              <button
                key={template.id}
                className={
                  selected.id === template.id ? classes.itemActive : classes.item
                }
                onClick={() => setSelected(template)}
              >
                <span className={classes.itemName}>{template.name}</span>
                <span className={classes.itemCount}>
                  {template.behaviors.length} поведений
                </span>
                <span className={classes.itemActions}>
                  <Pencil size={14} className={classes.itemIcon} />
                  <Trash2 size={14} className={classes.itemIcon} />
                </span>
              </button>
            ))}

            {filtered.length === 0 && (
              <span className={classes.empty}>Ничего не найдено</span>
            )}
          </div>

          <button className={classes.darkButton}>Создать свой софт скилл</button>
        </div>

        <div className={classes.right}>
          <div className={classes.header}>
            <span className={classes.title}>Состав софт скилла</span>
            <button className={classes.closeButton} onClick={onClose}>
              <X size={16} />
            </button>
          </div>

          <div className={classes.preview}>
            <span className={classes.previewName}>{selected.name}</span>
            <span className={classes.previewDescription}>
              {selected.description}
            </span>

            <div className={classes.previewRows}>
              {selected.behaviors.map((behavior) => (
                <div key={behavior} className={classes.previewRow}>
                  {behavior}
                </div>
              ))}
              <button className={classes.addRow}>+ Добавить поведение</button>
            </div>

            <button
              className={classes.addButton}
              onClick={() => setAdded((prev) => [...prev, selected.id])}
            >
              <Pencil size={12} />
              {added.includes(selected.id) ? 'Добавлено' : 'Добавить в доску'}
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
