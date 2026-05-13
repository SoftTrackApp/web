import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Board, BoardState } from './types';
import type { User } from '@/entities/user';

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

    setUsers: (state, action: PayloadAction<User[]>) => {
      if (state.currentBoard) {
        state.currentBoard.users = action.payload;
      }
    },
  },
});
