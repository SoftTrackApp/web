import { name } from './slice';
import type { BehaviorSetsState } from './types';

type State = {
  [name]: BehaviorSetsState;
};

const selectBehaviorSets = (state: State) => state[name];

export const selectors = {
  selectBehaviorSets,
};
