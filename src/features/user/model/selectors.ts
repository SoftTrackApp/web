import { createSelector } from '@reduxjs/toolkit';
import { name } from './slice';
import type { UsersState } from './types';

type State = {
  [name]: UsersState;
};

const root = (state: State) => state[name];
const selectUsers = createSelector(root, (state) => state);

export const selectors = {
  selectUsers,
};
