import classes from './header.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/shared/ui/button/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { BoardEntity } from '@/entities/board';
import { useSession, useLogout } from '@/features/session';

const navLinks = [
  { name: 'Главная', to: '/', restricted: false },
  { name: 'Доска оценивания', to: '/board', restricted: true },
  { name: 'Статистика', to: '/dashboard', restricted: false },
];

export function Header() {
  const dispatch = useDispatch();

  const board = useSelector(BoardEntity.selectors.selectBoard);
  const session = useSession();

  const logout = useLogout();

  const [open, setOpen] = useState(false);

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        {navLinks.map(
          (link) =>
            (!link.restricted || session.data?.role !== 'студент') && (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  clsx(classes.link, isActive && classes.active)
                }
              >
                {link.name}
              </NavLink>
            ),
        )}

        <div className={classes.buttons}>
          {board && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => dispatch(BoardEntity.actions.clearBoard())}
            >
              Сохранить доску
            </Button>
          )}

          <button onClick={() => logout.mutate()} className={classes.logOut}>
            Выйти
          </button>
        </div>
      </nav>

      {open && (
        <nav className={classes.mobileNav}>
          {navLinks.map(
            (link) =>
              (!link.restricted || session.data?.role !== 'студент') && (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    clsx(classes.link, isActive && classes.active)
                  }
                >
                  {link.name}
                </NavLink>
              ),
          )}

          <button
            onClick={() => logout.mutate()}
            className={classes.mobileLogOut}
          >
            Выйти
          </button>
        </nav>
      )}

      <div className={classes.headerMobile}>
        {board && !open && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => dispatch(BoardEntity.actions.clearBoard())}
          >
            Сохранить доску
          </Button>
        )}

        <Button
          className={classes.menuButton}
          variant="icon"
          size="sm"
          onClick={() => setOpen((open) => !open)}
        >
          <Menu />
        </Button>
      </div>
    </header>
  );
}
