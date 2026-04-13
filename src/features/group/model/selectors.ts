import { name } from './slice';
import type { GroupsState } from './types';

type State = {
  [name]: GroupsState;
};

const selectGroups = (state: State) => state[name];

export const selectors = {
  selectGroups,
};
