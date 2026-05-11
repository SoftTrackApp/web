import type { SessionState } from './types';

interface RootState {
  session: SessionState;
}

const selectSession = (state: RootState) => state.session;

export const selectors = {
  selectSession,
};
