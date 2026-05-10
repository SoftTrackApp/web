import { createPortal } from 'react-dom';
import classes from './dialog.module.css';
import { useEffect } from 'react';

interface DialogProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

export function Dialog({ children, onClose }: DialogProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keypress', onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className={classes.wrapper} onClick={onClose}>
      <div className={classes.dialog} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
