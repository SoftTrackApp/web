import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { Link, Navigate, Outlet, useLocation, type LinkProps } from '@tanstack/react-router';
import { AuthFeature } from '@/features/auth';
import clsx from 'clsx';

function NavBarLink(props: LinkProps) {
  const { pathname } = useLocation();

  return <Link className={clsx(pathname === props.to && 'font-semibold')} {...props} />;
}

export function Layout() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(AuthFeature.actions.requestUserFetch());
  }, [dispatch]);

  const signOutHandler = () => {
    dispatch(AuthFeature.actions.requestSignOut());
  };

  if (loading) return <span>Loading...</span>;
  if (!user) return <Navigate to="/signin" replace />;

  return (
    <div>
      <header className="flex justify-between py-4 px-8 xl:px-32 border-b border-gray-200">
        <nav className="flex gap-10">
          <NavBarLink to="/">Главная</NavBarLink>

          {user.canCreateBoards && <NavBarLink to="/board">Доска оценивания</NavBarLink>}
          {user.canViewStats && <NavBarLink to="/dashboard">Статистика</NavBarLink>}
          {user.canManageSkills && <NavBarLink to="/manage/skills">Навыки</NavBarLink>}
          {user.canManageUsers && <NavBarLink to="/manage/users">Пользователи</NavBarLink>}
        </nav>

        <span className="cursor-pointer" onClick={signOutHandler}>
          Выйти
        </span>
      </header>

      <Outlet />
    </div>
  );
}
