import type { Credentials, Session } from '../model/types';

export const SessionApi = {
  fetchSession: async (): Promise<Session> => {
    return {
      id: 1,
      username: 'i24s0000',
    };
  },
  logIn: async (credentials: Credentials): Promise<Session> => {
    return {
      id: 1,
      username: 'i24s0000',
    };
  },
  logOut: async () => {},
};
