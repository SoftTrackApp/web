import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Session, SessionState } from './types';

const initialState: SessionState = {
  session: null,
  loading: false,
  error: null,
};

export const { actions, reducer } = createSlice({
  name: 'session',
  initialState,
  reducers: {
    fetchSession: (state) => {
      state.session = null;
      state.loading = true;
      state.error = null;
    },

    logIn: (state) => {
      state.session = null;
      state.loading = true;
      state.error = null;
    },

    logOut: (state) => {
      state.session = null;
      state.loading = false;
      state.error = null;
    },

    setSession: (state, action: PayloadAction<Session>) => {
      state.session = action.payload;
      state.loading = false;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
