import { useCurrentUser } from '@/entities/user';
import { Link, Navigate, Outlet } from '@tanstack/react-router';

export function Layout() {
  const { user, isPending, error } = useCurrentUser();

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Ошибка: {error.message}</span>;

  if (!user) return <Navigate to="/signin" replace />;

  return (
    <div>
      <header className="flex justify-between py-4 px-32 border-b border-gray-200">
        <nav className="flex gap-10">
          <Link to="/">Главная</Link>

          {user.canCreateBoards && <Link to="/board">Доска оценивания</Link>}
          {user.canViewStats && <Link to="/dashboard">Статистика</Link>}
          {user.canManageSkills && <Link to="/manage/skills">Навыки</Link>}
          {user.canManageUsers && <Link to="/manage/users">Пользователи</Link>}
        </nav>

        <a>Выйти</a>
      </header>

      <Outlet />
    </div>
  );
}
