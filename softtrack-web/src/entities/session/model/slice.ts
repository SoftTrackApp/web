import { createSlice } from '@reduxjs/toolkit';
import type { SessionState } from './types';

const initialState: SessionState = {
  session: null,
};

export const userSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
});
