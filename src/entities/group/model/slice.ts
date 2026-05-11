import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Group, GroupState } from './types';

const initialState: GroupState = {
  data: [],
  isLoading: false,
  error: null,
};

export const { reducer, actions } = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    fetchGroups: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    setGroups: (state, action: PayloadAction<Group[]>) => {
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
