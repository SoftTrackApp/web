import { SessionFeature } from '@/features/session';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([fork(SessionFeature.saga)]);
}
