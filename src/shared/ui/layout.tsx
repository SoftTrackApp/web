import { useEffect } from 'react';
import { Link, Navigate, Outlet, useLocation, type LinkProps } from '@tanstack/react-router';
import { SessionFeature } from '@/features/session';
import classes from './layout.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

function NavBarLink(props: LinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      className={clsx(classes.navBarLink, pathname === props.to && classes.selectedLink)}
      {...props}
    />
  );
}

export function Layout() {
  const dispatch = useDispatch();
  const { session, loading } = useSelector(SessionFeature.selectors.selectSession);

  useEffect(() => {
    dispatch(SessionFeature.actions.fetchSession());
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(SessionFeature.actions.logOut());
  };

  if (loading) return <span>Загрузка...</span>;
  if (!session) return <Navigate to="/login" replace />;

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <NavBarLink to="/">Главная</NavBarLink>
          <NavBarLink to="/board">Доска оценивания</NavBarLink>
          <NavBarLink to="/dashboard">Статистика</NavBarLink>
          <NavBarLink to="/manage/skills">Навыки</NavBarLink>
          <NavBarLink to="/manage/users">Пользователи</NavBarLink>
        </nav>

        <span className={classes.logOut} onClick={handleLogOut}>Выйти</span>
      </header>

      <Outlet />
    </>
  );
}
