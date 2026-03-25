import { saga } from './model/sagas';
import { actions, reducer } from './model/slice';

export const SessionEntity = {
  saga,
  actions,
  reducer,
};

export type { Session } from './model/types';
