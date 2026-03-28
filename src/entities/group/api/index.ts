import type { Group } from '../model/types';

const exampleGroups: Group[] = [
  { id: 1, name: '24-11' },
  { id: 2, name: '24-12' },
  { id: 3, name: '24-13' },
  { id: 4, name: '24-14' },
];

export const GroupApi = {
  fetchGroups: async (): Promise<Group[]> => exampleGroups,
};
