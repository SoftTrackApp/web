export interface Board {
  name: string;
  group: string;
  behaviorSetId: number;
  selectedUserId: number;
}

export interface BoardState {
  board: Board | null;
}
