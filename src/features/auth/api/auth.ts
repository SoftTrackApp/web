import type { CurrentUser } from '../model/types';

const testUser: CurrentUser = {
  id: 1,
  username: 'i24s0000',
  canCreateBoards: true,
  canViewStats: true,
  canManageSkills: true,
  canManageUsers: true,
};

export const AuthApi = {
  async signIn(data: { username: string; password?: string }): Promise<CurrentUser> {
    // TODO: send request to the API
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(() => resolve(testUser), 1000);
    });
  },

  async signOut(): Promise<void> {
    // TODO: send request to the API
  },

  async fetchCurrentUser(): Promise<CurrentUser | null> {
    // TODO: send request to the API
    return new Promise((resolve) => {
      setTimeout(() => resolve(testUser), 1000);
    });
  },
};
