import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from '@tanstack/react-router';
import { SessionFeature } from '@/features/session';

export function Layout() {
  const dispatch = useDispatch();
  const session = useSelector(SessionFeature.selectors.selectSession);

  useEffect(() => {
    dispatch(SessionFeature.actions.fetchSession());
  }, [dispatch]);

  if (session.isLoading) return null;
  if (!session.data) return <Navigate to="/signin" replace />;

  return <Outlet />;
}
