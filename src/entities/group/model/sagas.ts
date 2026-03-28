import { call, put, takeLatest } from 'redux-saga/effects';
import type { Group } from './types';
import { GroupApi } from '../api';
import { actions } from './slice';

export function* fetchGroups() {
  try {
    const groups: Group[] = yield call(GroupApi.fetchGroups);
    yield put(actions.setGroups(groups));
  } catch (e) {
    if (e instanceof Error) {
      yield put(actions.setError(e.message));
    } else {
      yield put(actions.setError('Произошла ошибка'));
    }
  }
}

export function* saga() {
  yield takeLatest(actions.fetchGroups.type, fetchGroups);
}
