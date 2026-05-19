import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AddBehaviorAction, Board, BoardState } from './types';
import type { User } from '@/entities/user';

const initialState: BoardState = {
  currentBoard: null,
  usersError: null,
};

export const { reducer, actions } = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Board>) => {
      state.currentBoard = action.payload;
    },

    setBehaviorSetId: (state, action: PayloadAction<number>) => {
      if (state.currentBoard) {
        state.currentBoard.behaviorSetId = action.payload;
      }
    },

    setUsers: (state, action: PayloadAction<User[]>) => {
      if (state.currentBoard) {
        state.currentBoard.users = action.payload;
      }
    },

    setUsersError: (state, action: PayloadAction<string>) => {
      state.usersError = action.payload;
    },

    addUserBehavior: (state, action: PayloadAction<AddBehaviorAction>) => {
      if (!state.currentBoard) return;

      const { userId, behavior } = action.payload;

      const user = state.currentBoard.users.find((u) => u.id === userId);
      if (!user) return;

      user.behaviors ??= [];
      user.behaviors.push(behavior);
    },
  },
});
