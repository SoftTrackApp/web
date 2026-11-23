import type { BehaviorTemplate, SkillSet, SkillTemplate } from './types';

const skills = (prefix: string, names: string[]) =>
  names.map((name, index) => ({ id: `${prefix}-${index}`, name }));

export const mockSkillSets: SkillSet[] = [
  {
    id: 'set-basic',
    name: 'Базовый',
    behaviors: [
      {
        id: 'behavior-listening',
        name: 'Слушал на уроке',
        skills: skills('listening', [
          'Коммуникация',
          'Активное слушание',
          'Внимательность',
          'Концентрация',
          'Понимание задания',
          'Уважение к говорящему',
          'Наблюдательность',
          'Обратная связь',
        ]),
      },
      {
        id: 'behavior-team',
        name: 'Работал в команде',
        skills: skills('team', [
          'Сотрудничество',
          'Распределение ролей',
          'Помощь одноклассникам',
          'Договороспособность',
          'Гибкость',
          'Ответственность',
          'Поддержка',
          'Общая цель',
        ]),
      },
      {
        id: 'behavior-result',
        name: 'Отвечал за результат',
        skills: skills('result', [
          'Планирование',
          'Управление временем',
          'Самоконтроль',
          'Настойчивость',
          'Доведение до конца',
          'Анализ ошибок',
          'Инициативность',
          'Рефлексия',
        ]),
      },
    ],
  },
  {
    id: 'set-student',
    name: 'Ученик',
    behaviors: [
      {
        id: 'behavior-notes',
        name: 'Вёл конспект',
        skills: skills('notes', ['Внимательность', 'Структурирование', 'Аккуратность', 'Самодисциплина']),
      },
      {
        id: 'behavior-questions',
        name: 'Задавал вопросы',
        skills: skills('questions', [
          'Любознательность',
          'Инициативность',
          'Коммуникация',
          'Смелость',
          'Критическое мышление',
        ]),
      },
    ],
  },
  {
    id: 'set-leader',
    name: 'Лидер',
    behaviors: [
      {
        id: 'behavior-lead',
        name: 'Вёл за собой',
        skills: skills('lead', ['Уверенность', 'Ответственность', 'Мотивация', 'Пример', 'Решительность']),
      },
      {
        id: 'behavior-delegate',
        name: 'Делегировал задачи',
        skills: skills('delegate', ['Планирование', 'Доверие', 'Контроль', 'Обратная связь']),
      },
      {
        id: 'behavior-mediate',
        name: 'Решал конфликты',
        skills: skills('mediate', ['Эмпатия', 'Спокойствие', 'Аргументация', 'Поиск компромисса']),
      },
    ],
  },
  {
    id: 'set-project',
    name: 'Проект',
    behaviors: [
      {
        id: 'behavior-research',
        name: 'Исследовал тему',
        skills: skills('research', ['Анализ', 'Поиск информации', 'Критическое мышление', 'Выводы']),
      },
      {
        id: 'behavior-present',
        name: 'Защитил проект',
        skills: skills('present', ['Публичные выступления', 'Структура', 'Убедительность', 'Работа с вопросами', 'Уверенность']),
      },
    ],
  },
  {
    id: 'set-mentor',
    name: 'Наставник',
    behaviors: [
      {
        id: 'behavior-explain',
        name: 'Объяснял материал',
        skills: skills('explain', ['Терпение', 'Ясность', 'Примеры', 'Проверка понимания']),
      },
      {
        id: 'behavior-support',
        name: 'Поддерживал',
        skills: skills('support', ['Эмпатия', 'Внимательность', 'Похвала', 'Мотивация']),
      },
    ],
  },
];

export const mockSkillTemplates: SkillTemplate[] = [
  { id: 'skill-template-1', name: 'Активное слушание' },
  { id: 'skill-template-2', name: 'Работа в команде' },
  { id: 'skill-template-3', name: 'Критическое мышление' },
  { id: 'skill-template-4', name: 'Управление временем' },
];

export const mockBehaviorTemplates: BehaviorTemplate[] = [
  {
    id: 'behavior-template-1',
    name: 'Слушал на уроке',
    skills: ['Активное слушание', 'Внимательность'],
  },
  {
    id: 'behavior-template-2',
    name: 'Работал в команде',
    skills: ['Сотрудничество', 'Помощь одноклассникам', 'Договороспособность'],
  },
  {
    id: 'behavior-template-3',
    name: 'Отвечал за результат',
    skills: ['Планирование', 'Управление временем'],
  },
  {
    id: 'behavior-template-4',
    name: 'Задавал вопросы',
    skills: ['Любознательность', 'Коммуникация'],
  },
  {
    id: 'behavior-template-5',
    name: 'Помогал одноклассникам',
    skills: ['Эмпатия', 'Поддержка', 'Ответственность'],
  },
];
