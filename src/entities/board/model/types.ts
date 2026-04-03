export interface Board {
  name: string;
  group: string;
  behaviorSetId: number;
}

export interface BoardState {
  board: Board | null;
}
