export interface Board {
  name: string;
  behaviorSetId: number;
}

export interface BoardState {
  currentBoard: Board | null;
}
