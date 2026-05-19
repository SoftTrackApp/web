import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { GroupApi } from '@/entities/group/api';
import type { User } from '@/entities/user';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AddBehaviorAction, Board } from './types';
import { BoardApi } from '../api';

function* fetchUsers(action: PayloadAction<Board>) {
  try {
    const data: User[] = yield call(GroupApi.fetchIntersection, {
      group: action.payload.groupName1,
      subgroup: action.payload.groupName2,
    });

    yield put(actions.setUsers(data));
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Произошла ошибка';
    yield put(actions.setUsersError(message));
  }
}

function* createRecord(action: PayloadAction<AddBehaviorAction>) {
  try {
    yield call(BoardApi.createRecord, {
      title: action.payload.title,
      receiverId: action.payload.userId,
      behaviorId: action.payload.behavior.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Произошла ошибка';
    yield put(actions.setUsersError(message));
  }
}

export function* saga() {
  yield takeLatest(actions.setBoard.type, fetchUsers);
  yield takeLatest(actions.addUserBehavior.type, createRecord);
}
