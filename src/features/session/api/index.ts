import { client } from '@/shared/api';
import type { Credentials, Session } from '../model/types';
import { isAxiosError } from 'axios';

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
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 401) {
        throw new Error('INVALID_CREDENTIALS');
      }

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
