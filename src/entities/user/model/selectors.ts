import type { UsersState } from './types';

interface RootState {
  users: UsersState;
}

const selectUsers = (state: RootState) => state.users;

export const selectors = {
  selectUsers,
};
