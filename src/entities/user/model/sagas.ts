import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import type { User } from './types';
import { GroupApi } from '@/entities/group/api';

function* fetchUsers() {
  try {
    const users: User[] = yield call(GroupApi.fetchIntersection, {});
    yield put(actions.setUsers(users));
  } catch (err) {
    const code = err instanceof Error ? err.message : 'UNKNOWN_ERROR';
    yield put(actions.setError(code));
  }
}

export function* saga() {
  yield takeLatest(actions.fetchUsers.type, fetchUsers);
}
