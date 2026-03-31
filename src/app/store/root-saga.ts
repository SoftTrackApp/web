import { GroupEntity } from '@/entities/group';
import { SessionEntity } from '@/entities/session';
import { BehaviorSetEntity } from '@/entities/behavior-set';
import { UserEntity } from '@/entities/user';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    fork(SessionEntity.saga),
    fork(UserEntity.saga),
    fork(GroupEntity.saga),
    fork(BehaviorSetEntity.saga),
  ]);
}
