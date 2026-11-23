import classes from './dropdown.module.css';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

export interface DropdownItem {
  label: string;
  onSelect?: () => void;
  checked?: boolean;
  danger?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  width?: number;
  align?: 'start' | 'end';
  className?: string;
  triggerClassName?: string;
}

export function Dropdown({
  trigger,
  items,
  width,
  align = 'start',
  className,
  triggerClassName,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div className={clsx(classes.root, className)} ref={rootRef}>
      <button
        type="button"
        className={clsx(classes.trigger, triggerClassName)}
        onClick={() => setOpen(!open)}
      >
        {trigger}
      </button>

      {open && (
        <div
          className={clsx(classes.panel, align === 'end' && classes.panelEnd)}
          style={width ? { width } : undefined}
        >
          {items.map((item, index) => (
            <button
              key={`${item.label}-${index}`}
              type="button"
              className={clsx(classes.item, item.danger && classes.danger)}
              onClick={() => {
                setOpen(false);
                item.onSelect?.();
              }}
            >
              {item.checked && <Check size={16} className={classes.check} />}
              <span className={clsx(item.checked && classes.checked)}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
