import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SessionFeature } from '@/features/session';
import { Navigate, Outlet } from 'react-router';

export function MainLayout() {
  const dispatch = useDispatch();
  const session = useSelector(SessionFeature.selectors.selectSession);

  useEffect(() => {
    dispatch(SessionFeature.actions.fetchSession());
  }, [dispatch]);

  if (session.isLoading) return <span>Загрузка...</span>;
  if (!session.data) return <Navigate to="/signin" replace />;

  return <Outlet />;
}
