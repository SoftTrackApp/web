import type { Behavior } from '@/entities/behavior';
import type { BehaviorSet } from '../model/types';

const behaviors: Behavior[] = [
  { id: 1, name: 'Четко формулирует мысли' },
  { id: 2, name: 'Стимулирует обмен мнениями' },
  { id: 3, name: 'Ищет альтернативные пути, если первый не сработал' },
  { id: 4, name: 'Проверяет источники и данные' },
  { id: 5, name: 'Обращается за ресурсами/помощью (к литературе, экспертам)' },
];

const behaviorSets: BehaviorSet[] = [
  {
    id: 1,
    name: 'Предметы гуманитарного и естественного профилей',
    behaviors: [behaviors[0], behaviors[1], behaviors[2]],
  },
  {
    id: 2,
    name: 'Технические предметы (Математика/Физика/ЭлДок)',
    behaviors: [behaviors[2], behaviors[3], behaviors[4]],
  },
  {
    id: 3,
    name: 'Тренинги (психология, актерское мастерство)',
    behaviors: [behaviors[0], behaviors[2], behaviors[4]],
  },
];

export const BehaviorSetApi = {
  fetchBehaviorSets: async (): Promise<BehaviorSet[]> => behaviorSets,
};
