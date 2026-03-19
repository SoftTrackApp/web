import { configureStore } from '@reduxjs/toolkit';
import { signInSaga, signOutSaga } from './auth/authSagas';
import authReducer from './auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(signInSaga);
sagaMiddleware.run(signOutSaga);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
