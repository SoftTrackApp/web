import { createSelector } from '@reduxjs/toolkit';
import { name } from './slice';
import type { GroupsState } from './types';

type State = {
  [name]: GroupsState;
};

const root = (state: State) => state[name];
const selectGroups = createSelector(root, (state) => state);

export const selectors = {
  selectGroups,
};
