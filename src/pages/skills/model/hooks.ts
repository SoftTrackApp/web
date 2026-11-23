import { useQuery } from '@tanstack/react-query';
import { mockBehaviorTemplates, mockSkillSets, mockSkillTemplates } from './mock-data';
import type { SkillSet, SkillTemplate, BehaviorTemplate } from './types';

export function useSkillSets() {
  return useQuery<SkillSet[]>({
    queryKey: ['skill-sets'],
    queryFn: () => mockSkillSets,
    initialData: mockSkillSets,
    staleTime: Infinity,
  });
}

export function useSkillTemplates() {
  return useQuery<SkillTemplate[]>({
    queryKey: ['skill-templates'],
    queryFn: () => mockSkillTemplates,
    initialData: mockSkillTemplates,
    staleTime: Infinity,
  });
}

export function useBehaviorTemplates() {
  return useQuery<BehaviorTemplate[]>({
    queryKey: ['behavior-templates'],
    queryFn: () => mockBehaviorTemplates,
    initialData: mockBehaviorTemplates,
    staleTime: Infinity,
  });
}
