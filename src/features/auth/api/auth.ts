import type { CurrentUser } from '../model/user';

const testUser = {
  id: 1,
  username: 'i24s0000',
  canCreateBoards: true,
  canViewStats: true,
  canManageSkills: true,
  canManageUsers: true,
};

export async function signIn(data: { username: string; password?: string }) {
  // TODO: send request to the API
  throw new Error('gqegeq');
  console.log(data);
  return testUser;
}

export async function signOut() {
  // TODO: send request to the API
}

export async function fetchCurrentUser(): Promise<CurrentUser | null> {
  // TODO: send request to the API
  return testUser;
}
