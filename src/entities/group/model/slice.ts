import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Group, GroupsState } from './types';

const initialState: GroupsState = {
  groups: null,
  loading: false,
  error: null,
};

export const { actions, reducer } = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    fetchGroups: (state) => {
      state.loading = true;
      state.error = null;
    },

    setGroups(state, action: PayloadAction<Group[]>) {
      state.groups = action.payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.groups = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});
