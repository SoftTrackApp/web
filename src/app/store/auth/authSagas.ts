import { call, put, takeEvery } from 'redux-saga/effects';
import type { PayloadAction } from '@reduxjs/toolkit';
import { signIn, signOut, type CurrentUser } from '@/features/auth';
import { signInFailed, signInSucceeded } from './authSlice';

function* signInWorker(action: PayloadAction<{ username: string; password?: string }>) {
  try {
    const user: CurrentUser = yield call(signIn, action.payload);
    yield put(signInSucceeded({ user }));
  } catch (e) {
    if (e instanceof Error) {
      yield put(signInFailed({ message: e.message }));
    }
  }
}

function* signOutWorker() {
  try {
    const user: CurrentUser = yield call(signOut);
    yield put({ type: 'USER_SIGNOUT_SUCCEEDED', user });
  } catch (e) {
    if (e instanceof Error) {
      yield put({ type: 'USER_SIGNOUT_FAILED', message: e.message });
    }
  }
}

export function* signInSaga() {
  yield takeEvery('USER_SIGNIN_REQUESTED', signInWorker);
}

export function* signOutSaga() {
  yield takeEvery('USER_SIGNOUT_REQUESTED', signOutWorker);
}
