import { SessionModel } from '@/entities/session';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([fork(SessionModel.saga)]);
}
