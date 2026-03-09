import type { CurrentUser } from '../model/user';

export async function signin(data: { login: string; password?: string }) {
  // TODO: send request to the API
  console.log(data);
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
  // TODO: send request to the API
  return {
    id: 1,
    username: 'username',
  };
}
