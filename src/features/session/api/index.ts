import type { Session } from '../model/types';

const exampleSession: Session = {
  id: '1',
  firstName: 'Name',
  lastName: 'Surname',
  role: '',
};

export const SessionApi = {
  fetchSession: async (): Promise<Session> => exampleSession,
};
