export type ParticipantRole =
  | 'администратор'
  | 'преподаватель'
  | 'ученик'
  | 'методист';

export interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  role: ParticipantRole;
  groups: string[];
}
