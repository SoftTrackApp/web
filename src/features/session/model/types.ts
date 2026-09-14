type Role = 'студент' | 'аудитор' | 'методист' | 'администратор';

export interface Session {
  id: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface Credentials {
  login: string;
  password: string;
}
