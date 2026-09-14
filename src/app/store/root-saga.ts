import { BoardEntity } from '@/entities/board';
import { all, fork } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([fork(BoardEntity.saga)]);
}
