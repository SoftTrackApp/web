import { saga } from './model/sagas';
import { actions, reducer } from './model/slice';

export const SessionModel = {
  saga,
  actions,
  reducer,
};

export type { Session } from './model/types';
