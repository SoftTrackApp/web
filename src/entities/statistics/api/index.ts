import { client } from '@/shared/api';
import type { SoftskillStat, BehaviorStat } from '../model/types';

export const StatisticsApi = {
  fetchSoftskillStats: async (userId: string) => {
    try {
      const res = await client.get<SoftskillStat[]>('/statistics/softskills', {
        params: { userId },
      });
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },

  fetchBehaviorStats: async (userId: string, softskillId: number) => {
    try {
      const res = await client.get<BehaviorStat[]>('/statistics/behaviors', {
        params: { userId, softskillId },
      });
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },
};
