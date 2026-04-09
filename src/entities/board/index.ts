import { selectors } from './model/selectors';
import { actions, reducer } from './model/slice';

export const BoardEntity = {
  actions,
  reducer,
  selectors,
};

export type { Board } from './model/types';
