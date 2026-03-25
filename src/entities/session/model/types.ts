export interface Session {
  id: number;
  username: string;
}

export interface SessionState {
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export interface Credentials {
  username: string;
  password: string;
}
