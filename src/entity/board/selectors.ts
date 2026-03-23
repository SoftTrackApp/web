import { createSelector } from '@reduxjs/toolkit';
import { name } from './model/slice';
import type { BoardState } from './model/types';

interface State {
  [name]: BoardState;
}

const root = (state: State) => state[name];

const selectData = createSelector(root, (rootData) => rootData.board);

export const selectors = {
  selectData,
};
