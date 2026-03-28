import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Skillset, SkillsetsState } from './types';

const initialState: SkillsetsState = {
  skillsets: null,
  loading: false,
  error: null,
};

export const { actions, reducer } = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    fetchSkillsets: (state) => {
      state.loading = true;
      state.error = null;
    },

    setSkillsets(state, action: PayloadAction<Skillset[]>) {
      state.skillsets = action.payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.skillsets = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});
