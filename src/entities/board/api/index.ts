import { client } from '@/shared/api';
import type { RecordCreate } from '../model/types';

export const BoardApi = {
  createRecord: async (data: RecordCreate) => {
    try {
      await client.post('/records', data);
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },
};
