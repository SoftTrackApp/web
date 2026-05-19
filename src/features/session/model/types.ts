type Role = 'студент' | 'аудитор' | 'методист' | 'администратор';

export interface Session {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface SessionState {
  isLoading: boolean;
  data: Session | null;
  error: string | null;
}

export interface Credentials {
  login: string;
  password: string;
}
