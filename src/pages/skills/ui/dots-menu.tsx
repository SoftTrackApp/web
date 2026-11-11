import classes from './dots-menu.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import { MoreVertical } from 'lucide-react';

interface DotsMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function DotsMenu({ onEdit, onDelete }: DotsMenuProps) {
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
          <button
            className={clsx(classes.menuDanger)}
            onClick={() => {
              setOpen(false);
              onDelete?.();
            }}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
}
