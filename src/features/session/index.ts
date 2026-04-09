import { saga } from './model/sagas';
import { selectors } from './model/selectors';
import { actions, reducer } from './model/slice';

export const SessionFeature = {
  saga,
  actions,
  reducer,
  selectors,
};

export type { Session } from './model/types';
