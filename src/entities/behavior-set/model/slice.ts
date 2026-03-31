import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BehaviorSet, BehaviorSetState } from './types';

const initialState: BehaviorSetState = {
  behaviorSets: null,
  loading: false,
  error: null,
};

export const { actions, reducer } = createSlice({
  name: 'behaviorSets',
  initialState,
  reducers: {
    fetchBehaviorSets: (state) => {
      state.loading = true;
      state.error = null;
    },

    setBehaviorSets(state, action: PayloadAction<BehaviorSet[]>) {
      state.behaviorSets = action.payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.behaviorSets = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});
