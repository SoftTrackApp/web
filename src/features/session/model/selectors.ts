import { name } from './slice';
import type { SessionState } from './types';

type State = {
  [name]: SessionState;
};

const selectSession = (state: State) => state[name];

export const selectors = {
  selectSession,
};
