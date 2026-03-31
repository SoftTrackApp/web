export interface Board {
  name: string;
  group: string;
  behaviorSet: string;
}

export interface BoardState {
  board: Board | null;
}
