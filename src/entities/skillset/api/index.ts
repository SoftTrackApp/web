import type { Skillset } from '../model/types';

const exampleSkillsets: Skillset[] = [
  { id: 1, name: 'Skillset 1' },
  { id: 2, name: 'Skillset 2' },
  { id: 3, name: 'Skillset 3' },
  { id: 4, name: 'Skillset 4' },
];

export const SkillsetApi = {
  fetchSkillsets: async (): Promise<Skillset[]> => exampleSkillsets,
};
