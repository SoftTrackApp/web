import { createPortal } from 'react-dom';
import classes from './dialog.module.css';
import { useEffect } from 'react';

interface DialogProps {
  children?: React.ReactNode;
  onClose?: () => void;
  wide?: boolean;
}

export function Dialog({ children, onClose, wide }: DialogProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(
    <div className={classes.wrapper} onClick={onClose}>
      <div
        className={`${classes.dialog} ${wide ? classes.dialogWide : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
