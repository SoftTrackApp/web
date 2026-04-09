import { GroupFeature } from '@/features/group';
import { SessionFeature } from '@/features/session';
import { BehaviorSetFeature } from '@/features/behavior-set';
import { UserFeature } from '@/features/user';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    fork(SessionFeature.saga),
    fork(UserFeature.saga),
    fork(GroupFeature.saga),
    fork(BehaviorSetFeature.saga),
  ]);
}
