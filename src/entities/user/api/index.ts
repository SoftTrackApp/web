import type { FetchUsersRequest, User } from '../model/types';
import { client } from '@/shared/api';

export const UserApi = {
  fetchUsers: async (data: FetchUsersRequest): Promise<User[]> => {
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
