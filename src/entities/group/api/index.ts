import { client } from '@/shared/api';
import type { Group, IntersectionRequest } from '../model/types';
import type { User } from '@/entities/user';

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

  fetchIntersection: async (data: IntersectionRequest): Promise<User[]> => {
    try {
      const res = await client.get('/groups/intersection', {
        params: {
          group1Cn: data.name1,
          group2Cn: data.name2,
        },
      });

      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },
};
