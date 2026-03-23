export interface Board {
  name: string;
  group: string;
  skillSetName: string;
};

export interface BoardState {
  board: Board | null;
}
