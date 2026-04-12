import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { SessionApi } from '../api';
import type { Session } from './types';

export function* fetchSession() {
  try {
    const session: Session = yield call(SessionApi.fetchSession);
    yield put(actions.setSession(session));
  } catch (err) {
    if (err instanceof Error) {
      yield put(actions.setError(err.message));
    }

    yield put(actions.setError('Произошла ошибка!'));
  }
}

export function* saga() {
  yield takeLatest(actions.fetchSession.type, fetchSession);
}
