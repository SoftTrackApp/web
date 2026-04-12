import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Session, SessionState } from './types';

const initialState: SessionState = {
  data: null,
  isLoading: true,
  error: null,
};

export const { name, reducer, actions } = createSlice({
  name: 'session',
  initialState,
  reducers: {
    fetchSession: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    setSession: (state, action: PayloadAction<Session>) => {
      state.data = action.payload;
      state.isLoading = false;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
