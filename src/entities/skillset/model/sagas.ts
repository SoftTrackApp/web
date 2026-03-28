import { call, put, takeLatest } from 'redux-saga/effects';
import type { Skillset } from './types';
import { SkillsetApi } from '../api';
import { actions } from './slice';

export function* fetchSkillsets() {
  try {
    const skillsets: Skillset[] = yield call(SkillsetApi.fetchSkillsets);
    yield put(actions.setSkillsets(skillsets));
  } catch (e) {
    if (e instanceof Error) {
      yield put(actions.setError(e.message));
    } else {
      yield put(actions.setError('Произошла ошибка'));
    }
  }
}

export function* saga() {
  yield takeLatest(actions.fetchSkillsets.type, fetchSkillsets);
}
