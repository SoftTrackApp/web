import type { BehaviorSet } from '../model/types';

const exampleBehaviorSets: BehaviorSet[] = [
  { id: 1, name: 'BehaviorSet 1' },
  { id: 2, name: 'BehaviorSet 2' },
  { id: 3, name: 'BehaviorSet 3' },
  { id: 4, name: 'BehaviorSet 4' },
];

export const BehaviorSetApi = {
  fetchBehaviorSets: async (): Promise<BehaviorSet[]> => exampleBehaviorSets,
};
