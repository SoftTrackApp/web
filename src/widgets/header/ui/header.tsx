import classes from './header.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router';
import { useDispatch } from 'react-redux';
import { SessionFeature } from '@/features/session';
import { Button } from '@/shared/ui/button';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { name: 'Главная', to: '/' },
  { name: 'Доска оценивания', to: '/rate' },
  { name: 'Статистика', to: '/dashboard' },
];

export function Header() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => clsx(classes.link, isActive && classes.active)}
          >
            {link.name}
          </NavLink>
        ))}

        <button
          onClick={() => dispatch(SessionFeature.actions.logOut())}
          className={classes.logOut}
        >
          Выйти
        </button>
      </nav>

      {open && (
        <nav className={classes.mobileNav}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => clsx(classes.link, isActive && classes.active)}
            >
              {link.name}
            </NavLink>
          ))}

          <button
            onClick={() => dispatch(SessionFeature.actions.logOut())}
            className={classes.mobileLogOut}
          >
            Выйти
          </button>
        </nav>
      )}

      <div className={classes.headerButton}>
        <Button variant="icon" size="sm" onClick={() => setOpen((open) => !open)}>
          <Menu />
        </Button>
      </div>
    </header>
  );
}
