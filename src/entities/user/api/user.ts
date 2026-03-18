import type { CurrentUser } from '../model/user';

let currentUser: CurrentUser | null = null;

export async function signIn(data: { login: string; password?: string }) {
  // TODO: send request to the API
  currentUser = {
    id: 1,
    username: data.login,
    canCreateBoards: true,
    canViewStats: true,
    canManageSkills: true,
    canManageUsers: true,
  };
}

export async function signOut() {
  // TODO: send request to the API
  currentUser = null;
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
  // TODO: send request to the API
  if (currentUser) {
    return currentUser;
  } else {
    throw new Error('Not logged in');
  }
}
