import { Navigate, Outlet } from 'react-router';
import { Header } from '@/widgets/header';
import { useSession } from '@/features/session';

export function MainLayout() {
  const session = useSession();

  if (session.isLoading) return null;
  if (!session.data) return <Navigate to="/signin" replace />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
