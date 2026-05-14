import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { UserApi, type User } from '@/entities/user';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Board } from './types';

function* fetchUsers(action: PayloadAction<Board>) {
  try {
    const data: User[] = yield call(UserApi.fetchUsers, {
      name1: action.payload.groupName1,
      name2: action.payload.groupName2,
    });
    yield put(actions.setUsers(data));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Произошла ошибка';
    yield put(actions.setUsersError(message));
  }
}

export function* saga() {
  yield takeLatest(actions.setBoard.type, fetchUsers);
}
