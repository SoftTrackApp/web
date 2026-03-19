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
    signInRequested(state) {
      state.loading = true;
      state.error = null;
    },

    signInSucceeded(state, action: PayloadAction<{ user: CurrentUser }>) {
      state.user = action.payload.user;
      state.loading = false;
    },

    signInFailed(state, action: PayloadAction<{ message: string }>) {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { signInRequested, signInSucceeded, signInFailed } = authSlice.actions;
export default authSlice.reducer;
