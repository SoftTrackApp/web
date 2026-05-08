import { saga } from './model/sagas';
import { selectors } from './model/selectors';
import { actions, reducer } from './model/slice';

export const BehaviorSetFeature = {
  saga,
  actions,
  reducer,
  selectors,
};

export type { Behavior } from './model/types';
