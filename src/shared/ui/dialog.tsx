import { useEffect, useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import { X } from 'lucide-react';
import classes from './dialog.module.css';
import clsx from 'clsx';

export function Dialog({
  trigger,
  children,
  className,
}: {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  const [show, setShow] = useState(false);
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

  return (
    <>
      <div onClick={() => setShow(!show)}>{trigger}</div>

      <div
        className={clsx(classes.wrapper, show ? classes.show : classes.hide)}
        onClick={handleClick}
        id="dialog-wrapper"
        role="dialog"
        aria-modal="true"
      >
        <div className={clsx(classes.dialog, className)}>
          <button className={classes.closeButton} onClick={() => setShow(false)}>
            <X size={16} />
          </button>

          {children}
        </div>
      </div>
    </>
  );
}
