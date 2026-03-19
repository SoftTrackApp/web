import { useAppSelector } from '@/app/store';

export function useCurrentUser() {
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);

  return { user, loading, error };
}
