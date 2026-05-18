export interface User {
  id: string;
  fName: string;
  lName: string;
}

export interface UsersState {
  data: User[];
  isLoading: boolean;
  error: string | null;
}
