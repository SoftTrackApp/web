import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import type { Group } from './types';
import { GroupApi } from '../api';

function* fetchGroups() {
  try {
    const academicGroups: Group[] = yield call(GroupApi.fetchAcademicGroups);
    const otherGroups: Group[] = yield call(GroupApi.fetchOtherGroups);

    yield put(actions.setAcademicGroups(academicGroups));
    yield put(actions.setOtherGroups(otherGroups));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Произошла ошибка';
    yield put(actions.setError(message));
  }
}

export function* saga() {
  yield takeLatest(actions.fetchGroups.type, fetchGroups);
}
