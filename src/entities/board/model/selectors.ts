import type { BoardState } from './types';

interface RootState {
  board: BoardState;
}

const selectBoard = (state: RootState) => state.board.currentBoard;

export const selectors = {
  selectBoard,
};
