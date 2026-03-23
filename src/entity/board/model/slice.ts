import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Board, BoardState } from './types';

const initialState: BoardState = {
  board: null,
};

export const { name, reducer, actions } = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Board>) => {
      state.board = action.payload;
    },
  },
});
