import type { Credentials, Session } from '../model/types';

const session: Session = {
  id: '1',
  firstName: 'Name',
  lastName: 'Surname',
  role: '',
};

export const SessionApi = {
  fetchSession: async (): Promise<Session> => session,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (_credentials: Credentials): Promise<Session> => session,
  logOut: async () => {},
};
