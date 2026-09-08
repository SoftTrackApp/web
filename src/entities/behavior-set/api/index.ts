import { client } from '@/shared/api/client';
import type { BehaviorSet } from '../model/types';

export const BehaviorSetApi = {
  fetchBehaviorSets: async () => {
    try {
      const res = await client.get<BehaviorSet[]>('/behavior-sets');
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },
};
