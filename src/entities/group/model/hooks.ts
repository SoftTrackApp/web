import { useQuery } from '@tanstack/react-query';
import { GroupApi } from '../api';
import type { IntersectionRequest } from './types';

export function useAcademicGroups() {
  return useQuery({
    queryKey: ['academicGroups'],
    queryFn: GroupApi.fetchAcademicGroups,
  });
}

export function useOtherGroups() {
  return useQuery({
    queryKey: ['otherGroups'],
    queryFn: GroupApi.fetchOtherGroups,
  });
}

export function useIntersection(req: IntersectionRequest) {
  return useQuery({
    queryKey: ['intersection'],
    queryFn: () => GroupApi.fetchIntersection(req),
  });
}
