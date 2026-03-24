import { useEffect, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { X } from 'lucide-react';
import classes from './dialog.module.css';
import clsx from 'clsx';

interface DialogProps {
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
  initialShow?: boolean;
}

export function Dialog({ trigger, children, onClose, initialShow = false }: DialogProps) {
  const [show, setShow] = useState(initialShow);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShow(false);
    }
  };

  useEffect(() => {
    return router.subscribe('onBeforeNavigate', () => {
      setShow(false);
    });
  }, [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key == 'Escape') {
        setShow(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!show && onClose) {
      onClose()
    }
  }, [show, onClose]);

  return (
    <>
      <div onClick={() => setShow(!show)}>{trigger}</div>

      <div
        className={clsx(classes.wrapper, show ? classes.show : classes.hide)}
        onClick={handleClick}
        role="dialog"
        aria-modal="true"
      >
        <div className={classes.dialog}>
          <button className={classes.closeButton} onClick={() => setShow(false)}>
            <X size={24} color="var(--c-gray-200)" />
          </button>

          {children}
        </div>
      </div>
    </>
  );
}
