import type { BehaviorSetState } from './types';

interface RootState {
  behaviorSets: BehaviorSetState;
}

const selectBehaviorSets = (state: RootState) => state.behaviorSets;

export const selectors = {
  selectBehaviorSets,
};
