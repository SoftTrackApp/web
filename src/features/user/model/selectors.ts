import { name } from './slice';
import type { UsersState } from './types';

type State = {
  [name]: UsersState;
};

const selectUsers = (state: State) => state[name];

export const selectors = {
  selectUsers,
};
