import { useEffect } from 'react';
import { Navigate, Outlet } from '@tanstack/react-router';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { SessionModel } from '@/entities/session';

export function Layout() {
  const dispatch = useAppDispatch();
  const { session, loading } = useAppSelector((state) => state.session);

  useEffect(() => {
    dispatch(SessionModel.actions.fetchSession());
  }, [dispatch]);

  if (loading) return <span>Загрузка...</span>;
  if (!session) return <Navigate to="/login" replace />

  return <Outlet />;
}
