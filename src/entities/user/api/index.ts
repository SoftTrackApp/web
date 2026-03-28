import type { User } from '../model/types';

const exampleUsers: User[] = [
  { id: 1, name: 'Johnni', surname: 'Harvey' },
  { id: 2, name: 'Angel', surname: 'Harris' },
  { id: 3, name: 'Josephine', surname: 'Sullivan' },
  { id: 4, name: 'Armando', surname: 'Cole' },
  { id: 5, name: 'Amber', surname: 'Jackson' },
  { id: 6, name: 'Angel', surname: 'Hanson' },
];

export const UserApi = {
  fetchUsers: async (): Promise<User[]> => exampleUsers,
};
