import { BoardEntity } from '@/entities/board';
import { UserEntity } from '@/entities/user';
import { SessionFeature } from '@/features/session';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([fork(SessionFeature.saga), fork(BoardEntity.saga), fork(UserEntity.saga)]);
}
