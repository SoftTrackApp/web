import { call, put, takeLatest } from 'redux-saga/effects';
import type { BehaviorSet } from './types';
import { BehaviorSetApi } from '../api';
import { actions } from './slice';

export function* fetchBehaviorSets() {
  try {
    const behaviorSets: BehaviorSet[] = yield call(BehaviorSetApi.fetchBehaviorSets);
    yield put(actions.setBehaviorSets(behaviorSets));
  } catch (e) {
    if (e instanceof Error) {
      yield put(actions.setError(e.message));
    } else {
      yield put(actions.setError('Произошла ошибка'));
    }
  }
}

export function* saga() {
  yield takeLatest(actions.fetchBehaviorSets.type, fetchBehaviorSets);
}
