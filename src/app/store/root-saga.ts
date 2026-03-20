import { AuthFeature } from '@/features/auth';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([fork(AuthFeature.sagas.init)]);
}
