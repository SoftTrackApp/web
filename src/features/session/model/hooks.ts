import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SessionApi } from '../api';

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: SessionApi.fetchSession,
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SessionApi.logIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: SessionApi.logOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
}
