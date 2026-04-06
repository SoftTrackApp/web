import type { User } from '../model/types';

const exampleUsers: User[] = [
  { id: 1, name: 'Johnni', surname: 'Harvey', records: [] },
  { id: 2, name: 'Angel', surname: 'Harris', records: [] },
  { id: 3, name: 'Josephine', surname: 'Sullivan', records: [] },
  { id: 4, name: 'Armando', surname: 'Cole', records: [] },
  { id: 5, name: 'Amber', surname: 'Jackson', records: [] },
  { id: 6, name: 'Angel', surname: 'Hanson', records: [] },
];

export const UserApi = {
  fetchUsers: async (): Promise<User[]> => exampleUsers,
};
