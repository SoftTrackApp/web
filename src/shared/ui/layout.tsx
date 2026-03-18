import { signOut, useCurrentUser } from '@/entities/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  type LinkProps,
} from '@tanstack/react-router';
import clsx from 'clsx';

function NavBarLink(props: LinkProps) {
  const { pathname } = useLocation();

  return <Link className={clsx(pathname === props.to && 'font-semibold')} {...props} />;
}

export function Layout() {
  const { user, isPending, error } = useCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: mutateLogOut } = useMutation({
    mutationFn: signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      await navigate({ to: '/signin' });
    },
  });

  if (isPending) return <span>Loading...</span>;
  if (error || !user) return <Navigate to="/signin" replace />;

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

        <span className="cursor-pointer" onClick={() => mutateLogOut()}>
          Выйти
        </span>
      </header>

      <Outlet />
    </div>
  );
}
