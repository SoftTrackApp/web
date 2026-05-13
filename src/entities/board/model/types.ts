export interface Board {
  name: string;
  group: number;
  behaviorSetId: number;
}

export interface BoardState {
  currentBoard: Board | null;
}
