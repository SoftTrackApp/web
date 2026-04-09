import { createSelector } from '@reduxjs/toolkit';
import { name } from './slice';
import type { BehaviorSetsState } from './types';

type State = {
  [name]: BehaviorSetsState;
};

const root = (state: State) => state[name];
const selectBehaviorSets = createSelector(root, (state) => state);

export const selectors = {
  selectBehaviorSets,
};
