export interface Group {
  id: number;
  name: string;
}

export interface GroupsState {
  groups: Group[] | null;
  loading: boolean;
  error: string | null;
}
