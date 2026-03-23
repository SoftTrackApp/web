// TODO: add more fields
export type CurrentUser = {
  id: number;
  username: string;
  canCreateBoards: boolean;
  canViewStats: boolean;
  canManageSkills: boolean;
  canManageUsers: boolean;
};

export interface AuthState {
  user: CurrentUser | null;
  loading: boolean;
  error: string | null;
}
