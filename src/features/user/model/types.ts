export interface IRecord {
  id: number;
  behaviorName: string;
  comments: string[];
}

export interface User {
  id: number;
  name: string;
  surname: string;
  records: IRecord[];
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}
