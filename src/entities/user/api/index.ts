import { faker } from '@faker-js/faker';
import type { FetchUsersRequest, User } from '../model/types';

const users: User[] = Array.from({ length: 20 }, () => ({
  id: crypto.randomUUID(),
  fName: faker.person.firstName(),
  lName: faker.person.lastName(),
}));

export const UserApi = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchUsers: async (_data: FetchUsersRequest): Promise<User[]> => users,
};
