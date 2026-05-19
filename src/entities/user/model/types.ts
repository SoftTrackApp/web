import type { Behavior } from '@/entities/behavior';

export interface User {
  id: string;
  fName: string;
  lName: string;
  behaviors?: Behavior[];
}

export interface UsersState {
  data: User[];
  isLoading: boolean;
  error: string | null;
}
