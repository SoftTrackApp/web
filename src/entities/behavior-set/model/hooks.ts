import { useQuery } from '@tanstack/react-query';
import type { BehaviorSet } from './types';

const mockSets: BehaviorSet[] = [
  {
    id: 1,
    name: 'Слушал на уроке',
    behaviors: [
      { id: 1, name: 'Коммуникация' },
      { id: 2, name: 'Коммуникация' },
    ],
  },
  {
    id: 2,
    name: 'Слушал на уроке',
    behaviors: [
      { id: 3, name: 'Коммуникация' },
      { id: 4, name: 'Коммуникация' },
    ],
  },
  {
    id: 3,
    name: 'Слушал на уроке',
    behaviors: [
      { id: 5, name: 'Коммуникация' },
      { id: 6, name: 'Коммуникация' },
    ],
  },
];

export function useBehaviorSets() {
  return useQuery({
    queryKey: ['behaviorSets'],
    queryFn: () => mockSets,
  });
}
