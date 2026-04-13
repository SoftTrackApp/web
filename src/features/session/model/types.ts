export interface Session {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface SessionState {
  isLoading: boolean;
  data: Session | null;
  error: string | null;
}

export interface Credentials {
  username: string;
  password: string;
}
