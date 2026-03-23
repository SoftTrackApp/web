import { sessionSaga } from './model/sagas';
import { actions, reducer } from './model/slice';

export const SessionModel = {
  saga: sessionSaga,
  actions,
  reducer,
};

export type { Session } from './model/types';
