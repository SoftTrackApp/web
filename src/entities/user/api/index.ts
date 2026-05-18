import type { User } from '../model/types';
import { client } from '@/shared/api';

export const UserApi = {
  fetchUsers: async () => {
    try {
      const res = await client.get<User[]>('/users/students');
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },
};
