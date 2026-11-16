import type { ParticipantRole } from './types';

export const roleLabels: Record<ParticipantRole, string> = {
  администратор: 'Администратор',
  преподаватель: 'Преподаватель',
  ученик: 'Ученик',
  методист: 'Методист',
};

export const roleTones: Record<
  ParticipantRole,
  'red' | 'yellow' | 'green' | 'grey'
> = {
  администратор: 'red',
  преподаватель: 'yellow',
  ученик: 'green',
  методист: 'grey',
};

export const roleOrder: ParticipantRole[] = [
  'преподаватель',
  'ученик',
  'администратор',
  'методист',
];
