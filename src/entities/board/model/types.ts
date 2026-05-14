import type { User } from '@/entities/user';

export interface Board {
  name: string;
  users: User[];
  behaviorSetId: number;
  groupName1: string;
  groupName2?: string;
}

export interface BoardState {
  currentBoard: Board | null;
  usersError: string | null;
}
