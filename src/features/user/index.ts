import { saga } from './model/sagas';
import { selectors } from './model/selectors';
import { actions, reducer } from './model/slice';

export const UserFeature = {
  saga,
  actions,
  reducer,
  selectors,
};
