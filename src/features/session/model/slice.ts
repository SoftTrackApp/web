import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Credentials, Session, SessionState } from './types';

const initialState: SessionState = {
  data: null,
  isLoading: true,
  error: null,
};

export const { reducer, actions } = createSlice({
  name: 'session',
  initialState,
  reducers: {
    fetchSession: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    logIn: {
      reducer: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      prepare: (credentials: Credentials) => ({
        payload: credentials,
      }),
    },

    logOut: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    setSession: (state, action: PayloadAction<Session | null>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
