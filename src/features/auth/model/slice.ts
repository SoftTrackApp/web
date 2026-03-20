import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CurrentUser } from './types';

// del export
export interface AuthState {
  user: CurrentUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

export const { name, reducer, actions } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requestUserFetch: (state) => {
      state.user = null;
      state.loading = true;
      state.error = null;
    },

    requestSignIn: (state, action: PayloadAction<{ username: string; password?: string }>) => {
      state.user = null;
      state.error = null;
      state.loading = true;
    },

    requestSignOut(state) {
      state.error = null;
      state.loading = true;
    },

    setUser(state, action: PayloadAction<CurrentUser | null>) {
      state.user = action.payload;
      state.error = null;
      state.loading = false;
    },

    setError(state, action: PayloadAction<string>) {
      state.user = null;
      state.error = action.payload;
      state.loading = false;
    },

    setLoading(state) {
      state.error = null;
      state.loading = true;
    },
  },
});
