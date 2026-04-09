import { saga } from './model/sagas';
import { selectors } from './model/selectors';
import { actions, reducer } from './model/slice';

export const GroupFeature = {
  saga,
  actions,
  reducer,
  selectors,
};
