import { saga } from './model/sagas';
import { selectors } from './model/selectors';
import { actions, reducer } from './model/slice';

export const UserEntity = {
  saga,
  actions,
  reducer,
  selectors,
};
