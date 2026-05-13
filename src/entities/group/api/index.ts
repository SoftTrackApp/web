import type { Group } from '../model/types';

const academicGroups: Group[] = [
  { name: '24-11', description: '' },
  { name: '24-12', description: '' },
  { name: '24-13', description: '' },
  { name: '24-14', description: '' },
];

const otherGroups: Group[] = [
  { name: 'A0', description: '' },
  { name: 'A1', description: '' },
  { name: 'A2', description: '' },
  { name: 'B1', description: '' },
  { name: 'B2', description: '' },
  { name: 'C1', description: '' },
];

export const GroupApi = {
  fetchAcademicGroups: async (): Promise<Group[]> => academicGroups,
  fetchOtherGroups: async (): Promise<Group[]> => otherGroups,
};
