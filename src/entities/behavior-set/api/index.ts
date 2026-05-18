import type { BehaviorSet } from '../model/types';
import { client } from '@/shared/api';

export const BehaviorSetApi = {
  fetchBehaviorSets: async (): Promise<BehaviorSet[]> => {
    try {
      const res = await client.get<BehaviorSet[]>('/behavior-sets');
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },
};
