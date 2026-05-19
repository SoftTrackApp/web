import type { Behavior } from '@/entities/behavior-set';
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

export interface AddBehaviorAction {
  title: string;
  userId: string;
  behavior: Behavior;
}

export interface RecordCreate {
  title: string;
  receiverId: string;
  behaviorId: number;
  comment?: string;
}
