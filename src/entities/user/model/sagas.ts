import { call, put, takeLatest } from 'redux-saga/effects';
import type { User } from './types';
import { UserApi } from '../api';
import { actions } from './slice';

export function* fetchUsers() {
  try {
    const users: User[] = yield call(UserApi.fetchUsers);
    yield put(actions.setUsers(users));
  } catch (e) {
    if (e instanceof Error) {
      yield put(actions.setError(e.message));
    } else {
      yield put(actions.setError('Произошла ошибка'));
    }
  }
}

export function* saga() {
  yield takeLatest(actions.fetchUsers.type, fetchUsers);
}
