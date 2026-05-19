import { client } from '@/shared/api';
import type { RecordsResponse } from '../model/types';

export const RecordApi = {
  fetchRecords: async (receiverId: string) => {
    try {
      const res = await client.get<RecordsResponse>(`/records/by-receiver/${receiverId}`);
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },

  fetchMyRecords: async (receiverId: string) => {
    try {
      const res = await client.get<RecordsResponse>(`/records/by-receiver/${receiverId}/mine`);
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },
};
