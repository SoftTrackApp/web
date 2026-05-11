import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BehaviorSet, BehaviorSetState } from './types';

const initialState: BehaviorSetState = {
  data: [],
  isLoading: false,
  error: null,
};

export const { reducer, actions } = createSlice({
  name: 'behaviorSets',
  initialState,
  reducers: {
    fetchBehaviorSets: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    setBehaviorSets: (state, action: PayloadAction<BehaviorSet[]>) => {
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
