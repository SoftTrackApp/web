import createSagaMiddleware from 'redux-saga';
import { SessionFeature } from '@/features/session';
import { configureStore } from '@reduxjs/toolkit';
import { rootSaga } from './root-saga';
import { BehaviorSetEntity } from '@/entities/behavior-set';
import { GroupEntity } from '@/entities/group';
import { BoardEntity } from '@/entities/board';
import { UserEntity } from '@/entities/user';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    session: SessionFeature.reducer,
    behaviorSets: BehaviorSetEntity.reducer,
    groups: GroupEntity.reducer,
    users: UserEntity.reducer,
    board: BoardEntity.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
