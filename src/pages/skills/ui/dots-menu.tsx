import classes from './dots-menu.module.css';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { MoreVertical } from 'lucide-react';

interface MenuItem {
  label: string;
  onSelect: () => void;
}

interface DotsMenuProps {
  items: MenuItem[];
  className?: string;
}

export function DotsMenu({ items, className }: DotsMenuProps) {
  const [open, setOpen] = useState(false);
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

  return (
    <div className={classes.root} ref={rootRef}>
      <button
        type="button"
        className={clsx(classes.trigger, open && classes.triggerOpen, className)}
        onClick={() => setOpen((state) => !state)}
        aria-label="Действия"
      >
        <MoreVertical size={20} />
      </button>

      {open && (
        <div className={classes.panel}>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className={classes.item}
              onClick={() => {
                setOpen(false);
                item.onSelect();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
