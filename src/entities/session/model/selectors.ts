import { createSelector } from '@reduxjs/toolkit';
import { name } from './slice';
import type { SessionState } from './types';

type State = {
  [name]: SessionState;
};

const root = (state: State) => state[name];
const selectSession = createSelector(root, (state) => state);

export const selectors = {
  selectSession,
};
