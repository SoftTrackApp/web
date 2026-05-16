import { client } from '@/shared/api';
import type { Credentials, Session } from '../model/types';

export const SessionApi = {
  fetchSession: async (): Promise<Session> => {
    try {
      const res = await client.get<Session>('/session');
      return res.data;
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },

  logIn: async (credentials: Credentials) => {
    try {
      await client.post('/session', credentials);
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },

  logOut: async () => {
    try {
      await client.delete('/session');
    } catch {
      throw new Error('UNKNOWN_ERROR');
    }
  },
};
