import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import type { BehaviorSet } from './types';
import { BehaviorSetApi } from '../api';

function* fetchBehaviorSets() {
  try {
    const data: BehaviorSet[] = yield call(BehaviorSetApi.fetchBehaviorSets);
    yield put(actions.setBehaviorSets(data));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Произошла ошибка!';
    yield put(actions.setError(message));
  }
}

export function* saga() {
  yield takeLatest(actions.fetchBehaviorSets.type, fetchBehaviorSets);
}
