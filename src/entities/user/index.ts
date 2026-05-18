import { saga } from './model/sagas';
import { selectors } from './model/selectors';
import { actions, reducer } from './model/slice';

export type { User } from './model/types';
export { UserApi } from './api';

export const UserEntity = {
  saga,
  reducer,
  actions,
  selectors,
};
