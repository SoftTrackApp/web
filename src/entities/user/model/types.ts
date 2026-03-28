export interface User {
  id: number;
  name: string;
  surname: string;
}

export interface UsersState {
  users: User[] | null;
  loading: boolean;
  error: string | null;
}
