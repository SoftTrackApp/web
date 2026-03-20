import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CurrentUser } from './types';
import { fetchCurrentUser, signIn, signOut } from '../api/auth';
import { actions } from './slice';

function* handleUserFetch() {
  try {
    const user: CurrentUser = yield call(fetchCurrentUser);
    yield put(actions.setUser(user));
  } catch (e) {
    if (e instanceof Error) {
      yield put(actions.setError(e.message));
    }
  }
}

function* handleSignIn(action: PayloadAction<{ username: string; password?: string }>) {
  try {
    const user: CurrentUser = yield call(signIn, action.payload);
    yield put(actions.setUser(user));
  } catch (e) {
    if (e instanceof Error) {
      yield put(actions.setError(e.message));
    }
  }
}

function* handleSignOut() {
  yield call(signOut);
  yield put(actions.setUser(null));
}

export function* authSaga() {
  yield takeEvery(actions.requestUserFetch.type, handleUserFetch);
  yield takeLatest(actions.requestSignIn.type, handleSignIn);
  yield takeEvery(actions.requestSignOut.type, handleSignOut);
}
