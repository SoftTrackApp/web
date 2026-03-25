export interface Board {
  name: string;
  group: string;
  skillset: string;
}

export interface BoardState {
  board: Board | null;
}
