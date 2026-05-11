export interface Group {
  id: number;
  name: string;
}

export interface GroupState {
  data: Group[];
  isLoading: boolean;
  error: string | null;
}
