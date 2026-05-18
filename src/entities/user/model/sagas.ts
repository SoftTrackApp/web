import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import type { User } from './types';
import { UserApi } from '../api';

function* fetchUsers() {
  try {
    const users: User[] = yield call(UserApi.fetchUsers);
    yield put(actions.setUsers(users));
  } catch (err) {
    const code = err instanceof Error ? err.message : 'UNKNOWN_ERROR';
    yield put(actions.setError(code));
  }
}

export function* saga() {
  yield takeLatest(actions.fetchUsers.type, fetchUsers);
}
