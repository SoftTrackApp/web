import type { Credentials, Session } from '../model/types';

const exampleSession: Session = {
  id: '1',
  firstName: 'Name',
  lastName: 'Surname',
  role: '',
};

export const SessionApi = {
  fetchSession: async (): Promise<Session> => exampleSession,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (_credentials: Credentials): Promise<Session> => exampleSession,
  logOut: async () => {},
};
