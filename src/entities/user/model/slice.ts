import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, UsersState } from './types';

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const { actions, reducer } = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers: (state) => {
      state.loading = true;
      state.error = null;
    },

    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.users = [];
      state.loading = false;
      state.error = action.payload;
    },

    addUserRecord: (state, action: PayloadAction<{ userId: number; behaviorName: string }>) => {
      const { userId, behaviorName } = action.payload;

      const user = state.users.find((u) => u.id === userId);
      if (!user) return;

      user.records.push({
        id: Date.now(),
        behaviorName,
        comments: [],
      });
    },
  },
});
