import { client } from '@/shared/api';
import type { Group } from '../model/types';

export const GroupApi = {
  fetchAcademicGroups: async (): Promise<Group[]> => {
    try {
      const res = await client.get<Group[]>('/groups/academic');
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },

  fetchOtherGroups: async (): Promise<Group[]> => {
    try {
      const res = await client.get<Group[]>('/groups/other');
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },
};
