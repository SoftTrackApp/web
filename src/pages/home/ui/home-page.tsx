import classes from './home-page.module.css';
import { ChartColumn, Plus, Settings2, User } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { ActionButton } from './action-button';

export function HomePage() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Главная страница</h1>

      <div className={classes.actionButtons}>
        <Link to="/board">
          <ActionButton
            title="Создать доску оценивания"
            description="Начните отмечать soft skills учеников"
            icon={<Plus size={64} color="var(--c-gray-200)" />}
          />
        </Link>

        <Link to="/dashboard">
          <ActionButton
            title="Посмотреть статистику"
            description="Оценки и прогресс учеников"
            icon={<ChartColumn size={64} color="var(--c-gray-200)" />}
          />
        </Link>

        <Link to="/manage/skills">
          <ActionButton
            title="Настройка навыков"
            description="Добавляйте и редактируйте список навыков"
            icon={<Settings2 size={64} color="var(--c-gray-200)" />}
          />
        </Link>

        <Link to="/manage/users">
          <ActionButton
            title="Управление пользователями"
            description="Добавляйте преподавателей и учеников"
            icon={<User size={64} color="var(--c-gray-200)" />}
          />
        </Link>
      </div>
    </div>
  );
}
