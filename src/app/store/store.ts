import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { rootSaga } from './root-saga';
import { GroupFeature } from '@/features/group';
import { SessionFeature } from '@/features/session';
import { BoardFeature } from '@/features/board';
import { UserFeature } from '@/features/user';
import { BehaviorSetFeature } from '@/features/behavior-set';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    session: SessionFeature.reducer,
    board: BoardFeature.reducer,
    users: UserFeature.reducer,
    groups: GroupFeature.reducer,
    behaviorSets: BehaviorSetFeature.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
