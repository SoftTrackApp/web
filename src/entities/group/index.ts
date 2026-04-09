import { saga } from './model/sagas';
import { selectors } from './model/selectors';
import { actions, reducer } from './model/slice';

export const GroupEntity = {
  saga,
  actions,
  reducer,
  selectors,
};
