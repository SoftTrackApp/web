import { createSelector } from '@reduxjs/toolkit';
import { type AuthState, name } from './model/slice';

interface State {
  [name]: AuthState;
}

const root = (state: State) => state[name];

const selectData = createSelector(root, (rootData) => rootData.user);

export const selectors = {
  selectData,
};
