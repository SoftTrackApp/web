import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Board, BoardState } from './types';

const initialState: BoardState = {
  board: null,
};

export const { actions, reducer } = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Board | null>) => {
      state.board = action.payload;
    },

    setSelectedUserId: (state, action: PayloadAction<number>) => {
      if (state.board) {
        state.board.selectedUserId = action.payload;
      }
    },
  },
});
