import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { SessionFeature } from '@/features/session';
import { Header } from '@/widgets/header';

export function MainLayout() {
  const dispatch = useDispatch();
  const session = useSelector(SessionFeature.selectors.selectSession);

  useEffect(() => {
    dispatch(SessionFeature.actions.fetchSession());
  }, [dispatch]);

  if (session.isLoading) return <span>Загрузка...</span>;
  if (!session.data) return <Navigate to="/signin" replace />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
