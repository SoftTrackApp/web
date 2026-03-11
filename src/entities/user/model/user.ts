// TODO: add more fields
export type CurrentUser = {
  id: number;
  username: string;
  canCreateBoards: boolean;
  canViewStats: boolean;
  canManageSkills: boolean;
  canManageUsers: boolean;
};
