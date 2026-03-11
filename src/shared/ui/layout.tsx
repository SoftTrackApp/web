import { useCurrentUser } from '@/entities/user';
import { Navigate, Outlet } from '@tanstack/react-router';

export function Layout() {
  const { user, isPending, error } = useCurrentUser();

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Ошибка: {error.message}</span>;

  if (!user) return <Navigate to="/signin" replace />;

  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
}
