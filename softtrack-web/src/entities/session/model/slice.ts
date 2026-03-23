import { createSlice } from '@reduxjs/toolkit';
import type { SessionState } from './types';

const initialState: SessionState = {
  session: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
});
