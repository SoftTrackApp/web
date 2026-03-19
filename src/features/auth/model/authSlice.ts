import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CurrentUser } from '@/features/auth';

interface AuthState {
  user: CurrentUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userFetchSucceeded: (state, action: PayloadAction<{ user: CurrentUser }>) => {
      state.user = action.payload.user;
      state.loading = false;
    },

    userFetchFailed: (state, action: PayloadAction<{ message: string }>) => {
      state.error = action.payload.message;
      state.loading = false;
    },

    signInRequested: (state) => {
      state.error = null;
      state.loading = true;
    },

    signInSucceeded: (state, action: PayloadAction<{ user: CurrentUser }>) => {
      state.user = action.payload.user;
      state.loading = false;
    },

    signInFailed: (state, action: PayloadAction<{ message: string }>) => {
      state.error = action.payload.message;
      state.loading = false;
    },

    signOutSucceeded(state) {
      state.user = null;
    },
  },
});

export const {
  userFetchSucceeded,
  userFetchFailed,
  signInRequested,
  signInSucceeded,
  signInFailed,
  signOutSucceeded,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
