import type { GroupState } from './types';

interface RootState {
  groups: GroupState;
}

const selectGroups = (state: RootState) => state.groups;

export const selectors = {
  selectGroups,
};
