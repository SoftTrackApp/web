import { BehaviorSetEntity } from '@/entities/behavior-set';
import { BoardEntity } from '@/entities/board';
import { GroupEntity } from '@/entities/group';
import { UserEntity } from '@/entities/user';
import { SessionFeature } from '@/features/session';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    fork(SessionFeature.saga),
    fork(BehaviorSetEntity.saga),
    fork(GroupEntity.saga),
    fork(BoardEntity.saga),
    fork(UserEntity.saga),
  ]);
}
