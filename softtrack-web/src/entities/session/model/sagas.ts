import { call, put, takeLatest } from 'redux-saga/effects';
import { SessionApi } from '../api/session';
import { actions } from './slice';
import type { Session } from './types';

function* fetchSession() {
  try {
    const session: Session = yield call(SessionApi.fetchSession);
    yield put(actions.setSession(session));
  } catch (e) {
    if (e instanceof Error) {
      yield put(actions.setError(e.message));
    } else {
      yield put(actions.setError('Произошла ошибка'));
    }
  }
}

function* logIn() {
  try {
    const session: Session = yield call(SessionApi.logIn);
    yield put(actions.setSession(session));
  } catch (e) {
    if (e instanceof Error) {
      yield put(actions.setError(e.message));
    } else {
      yield put(actions.setError('Произошла ошибка'));
    }
  }
}

function* logOut() {
  try {
    yield call(SessionApi.logOut);
    yield put(actions.logOut());
  } catch (e) {
    if (e instanceof Error) {
      yield put(actions.setError(e.message));
    } else {
      yield put(actions.setError('Произошла ошибка'));
    }
  }
}

export function* sessionSaga() {
  yield takeLatest(actions.fetchSession.type, fetchSession);
  yield takeLatest(actions.logIn.type, logIn);
  yield takeLatest(actions.logOut.type, logOut);
}
