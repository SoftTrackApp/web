import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { UserApi } from '../api';
import type { FetchUserRequest, User } from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

function* fetchGroups(action: PayloadAction<FetchUserRequest>) {
  try {
    const data: User[] = yield call(UserApi.fetchUsers, action.payload);
    yield put(actions.setUsers(data));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Произошла ошибка';
    yield put(actions.setError(message));
  }
}

export function* saga() {
  yield takeLatest(actions.fetchUsers.type, fetchGroups);
}
