import { call, put, takeLatest } from 'redux-saga/effects';
import { SessionApi } from '../api/session';
import { actions } from './slice';
import type { Credentials, Session } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

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

function* logIn(action: PayloadAction<Credentials>) {
  try {
    const session: Session = yield call(SessionApi.logIn, action.payload);
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

export function* saga() {
  yield takeLatest(actions.fetchSession.type, fetchSession);
  yield takeLatest(actions.logIn.type, logIn);
  yield takeLatest(actions.logOut.type, logOut);
}
