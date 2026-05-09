import { SessionFeature } from '@/features/session';
import { configureStore } from '@reduxjs/toolkit';
import { rootSaga } from './root-saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    session: SessionFeature.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
