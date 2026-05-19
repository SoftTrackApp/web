import createSagaMiddleware from 'redux-saga';
import { SessionFeature } from '@/features/session';
import { configureStore } from '@reduxjs/toolkit';
import { rootSaga } from './root-saga';
import { BoardEntity } from '@/entities/board';
import { UserEntity } from '@/entities/user';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    session: SessionFeature.reducer,
    board: BoardEntity.reducer,
    users: UserEntity.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
