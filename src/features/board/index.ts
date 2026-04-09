import { selectors } from './model/selectors';
import { actions, reducer } from './model/slice';

export const BoardFeature = {
  actions,
  reducer,
  selectors,
};

export type { Board } from './model/types';
