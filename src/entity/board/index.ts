import { actions, name, reducer } from './model/slice';
import { selectors } from './selectors';

export * from './model/types';

export const BoardEntity = {
  reducer: { [name]: reducer },
  actions,
  selectors,
};
