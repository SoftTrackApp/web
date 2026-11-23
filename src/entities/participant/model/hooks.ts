import { useQuery } from '@tanstack/react-query';
import type { Participant } from './types';

const mockParticipants: Participant[] = [
  {
    id: 1,
    firstName: 'Иван',
    lastName: 'Иванов',
    role: 'администратор',
    groups: ['Группа ИТ25-11'],
  },
  {
    id: 2,
    firstName: 'Пётр',
    lastName: 'Петров',
    role: 'преподаватель',
    groups: ['Группа ИТ25-12'],
  },
  {
    id: 3,
    firstName: 'Анна',
    lastName: 'Смирнова',
    role: 'ученик',
    groups: ['Группа ИТ25-13'],
  },
  {
    id: 4,
    firstName: 'Ольга',
    lastName: 'Кузнецова',
    role: 'методист',
    groups: ['Группа ИТ25-14'],
  },
  {
    id: 5,
    firstName: 'Дмитрий',
    lastName: 'Соколов',
    role: 'преподаватель',
    groups: ['Группа ИТ25-11'],
  },
  {
    id: 6,
    firstName: 'Мария',
    lastName: 'Волкова',
    role: 'ученик',
    groups: ['Группа ИТ25-12'],
  },
  {
    id: 7,
    firstName: 'Алексей',
    lastName: 'Морозов',
    role: 'ученик',
    groups: ['Группа ИТ25-13'],
  },
  {
    id: 8,
    firstName: 'Елена',
    lastName: 'Новикова',
    role: 'ученик',
    groups: ['Группа ИТ25-14'],
  },
  {
    id: 9,
    firstName: 'Сергей',
    lastName: 'Лебедев',
    role: 'ученик',
    groups: ['Группа ИТ25-11'],
  },
];

const mockGroups = [
  'Группа ИТ25-11',
  'Группа ИТ25-12',
  'Группа ИТ25-13',
  'Группа ИТ25-14',
];

export function useParticipants() {
  return useQuery({
    queryKey: ['participants'],
    queryFn: () => mockParticipants,
  });
}

export function useGroupOptions() {
  return useQuery({
    queryKey: ['groupOptions'],
    queryFn: () => mockGroups,
  });
}
