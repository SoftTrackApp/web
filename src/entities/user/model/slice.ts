import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FetchUsersRequest, User, UsersState } from './types';

const initialState: UsersState = {
  data: [],
  isLoading: true,
  error: null,
};

export const { reducer, actions } = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetchUsers: (state, _action: PayloadAction<FetchUsersRequest>) => {
      state.isLoading = true;
      state.error = null;
    },

    setUsers: (state, action: PayloadAction<User[]>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
