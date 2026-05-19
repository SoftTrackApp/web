import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { StatisticsApi } from '../api';

export function useSoftskillStats(userId?: string) {
  return useQuery({
    queryKey: ['softskillStats', userId],
    queryFn: () => StatisticsApi.fetchSoftskillStats(userId ?? ''),
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
}

export function useBehaviorStats(userId?: string, softskillId?: number) {
  return useQuery({
    queryKey: ['behaviorStats', userId],
    queryFn: () => StatisticsApi.fetchBehaviorStats(userId ?? '', softskillId ?? 0),
    placeholderData: keepPreviousData,
    enabled: !!userId && !!softskillId,
  });
}
