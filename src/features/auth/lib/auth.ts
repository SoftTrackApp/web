import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../api/auth';

export function useCurrentUser() {
  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    retry: false,
  });

  return { user, isPending, error };
}
