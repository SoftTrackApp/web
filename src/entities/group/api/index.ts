import { client } from '@/shared/api';
import type { Group, IntersectionRequest } from '../model/types';
import type { User } from '@/entities/user';

export const GroupApi = {
  fetchAcademicGroups: async () => {
    try {
      const res = await client.get<Group[]>('/groups/academic');
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },

  fetchOtherGroups: async () => {
    try {
      const res = await client.get<Group[]>('/groups/other');
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },

  fetchIntersection: async (params: IntersectionRequest) => {
    try {
      const res = await client.get<User[]>(`/groups/intersection`, {
        params: {
          group: [params.group, params.subgroup],
        },
      });
      
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },
};
