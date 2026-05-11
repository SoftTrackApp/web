import { saga } from './model/sagas';
import { selectors } from './model/selectors';
import { actions, reducer } from './model/slice';

export const BehaviorSetEntity = {
  reducer,
  actions,
  saga,
  selectors,
};
