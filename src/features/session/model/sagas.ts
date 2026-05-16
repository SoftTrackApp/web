import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { SessionApi } from '../api';
import type { Credentials, Session } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

function* fetchSession() {
  try {
    const session: Session = yield call(SessionApi.fetchSession);
    yield put(actions.setSession(session));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Произошла ошибка!';
    yield put(actions.setError(message));
  }
}

function* logIn(action: PayloadAction<Credentials>) {
  try {
    yield call(SessionApi.logIn, action.payload);
    yield fetchSession();
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Произошла ошибка!';
    yield put(actions.setError(message));
  }
}

function* logOut() {
  try {
    yield call(SessionApi.logOut);
    yield put(actions.setSession(null));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Произошла ошибка!';
    yield put(actions.setError(message));
  }
}

export function* saga() {
  yield takeLatest(actions.fetchSession.type, fetchSession);
  yield takeLatest(actions.logIn.type, logIn);
  yield takeLatest(actions.logOut.type, logOut);
}
