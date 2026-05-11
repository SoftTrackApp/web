import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import type { Group } from './types';
import { GroupApi } from '../api';

function* fetchGroups() {
  try {
    const data: Group[] = yield call(GroupApi.fetchGroups);
    yield put(actions.setGroups(data));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Произошла ошибка';
    yield put(actions.setError(message));
  }
}

export function* saga() {
  yield takeLatest(actions.fetchGroups.type, fetchGroups);
}
