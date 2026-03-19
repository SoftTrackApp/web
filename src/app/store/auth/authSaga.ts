import { call, put, takeEvery } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrentUser, signIn, signOut, type CurrentUser } from '@/features/auth';
import {
  signInFailed,
  signInRequested,
  signInSucceeded,
  signOutSucceeded,
  userFetchSucceeded,
} from './authSlice';

function* handleUserFetch() {
  try {
    const user: CurrentUser = yield call(fetchCurrentUser);
    yield put(userFetchSucceeded({ user }));
  } catch (e) {
    if (e instanceof Error) {
      yield put(signInFailed({ message: e.message }));
    }
  }
}

function* handleSignIn(action: PayloadAction<{ username: string; password?: string }>) {
  yield put(signInRequested());

  try {
    const user: CurrentUser = yield call(signIn, action.payload);
    yield put(signInSucceeded({ user }));
  } catch (e) {
    if (e instanceof Error) {
      yield put(signInFailed({ message: e.message }));
    }
  }
}

function* handleSignOut() {
  yield call(signOut);
  yield put(signOutSucceeded());
}

export function* authSaga() {
  yield takeEvery('USER_FETCH_REQUESTED', handleUserFetch);
  yield takeEvery('USER_SIGNIN_REQUESTED', handleSignIn);
  yield takeEvery('USER_SIGNOUT_REQUESTED', handleSignOut);
}
