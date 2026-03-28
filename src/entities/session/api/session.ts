import type { Credentials, Session } from '../model/types';

const exampleSession: Session = {
  id: 1,
  username: 'i24s0000',
};

export const SessionApi = {
  fetchSession: async (): Promise<Session> => exampleSession,
  logIn: async (_credentials: Credentials): Promise<Session> => exampleSession,
  logOut: async () => {},
};
