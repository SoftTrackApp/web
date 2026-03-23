export interface Session {
  id: number;
  username: string;
}

export interface SessionState {
  session: Session | null;
}
