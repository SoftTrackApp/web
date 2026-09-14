import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { rootSaga } from './root-saga';
import { BoardEntity } from '@/entities/board';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    board: BoardEntity.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
