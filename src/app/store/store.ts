import { SessionEntity } from '@/entities/session';
import { BoardEntity } from '@/entities/board';
import { configureStore } from '@reduxjs/toolkit';
import { rootSaga } from './root-saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    session: SessionEntity.reducer,
    board: BoardEntity.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
