import { useQuery } from '@tanstack/react-query';
import { BehaviorSetApi } from '../api';

export function useBehaviorSets() {
  return useQuery({
    queryKey: ['behaviorSets'],
    queryFn: BehaviorSetApi.fetchBehaviorSets,
  });
}
