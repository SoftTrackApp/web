import { createSelector } from '@reduxjs/toolkit';
import { name } from './slice';
import type { BoardState } from './types';

type State = {
  [name]: BoardState;
};

const root = (state: State) => state[name];
const selectBoard = createSelector(root, (state) => state.board);

export const selectors = {
  selectBoard,
};
