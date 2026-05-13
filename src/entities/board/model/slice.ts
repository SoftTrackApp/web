import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Board, BoardState } from './types';

const initialState: BoardState = {
  currentBoard: null,
};

export const { reducer, actions } = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Board | null>) => {
      state.currentBoard = action.payload;
    },
  },
});
