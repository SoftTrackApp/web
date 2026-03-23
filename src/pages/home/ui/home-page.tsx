import { ChartBar, Settings2, User } from 'lucide-react';
import { ActionCard } from './action-card';
import { Link } from '@tanstack/react-router';
import { useAppSelector } from '@/app/store';
import { CreateBoardCard } from './create-board-card';

export function HomePage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex items-center xl:justify-center mx-auto h-full flex-col gap-16 mt-38">
      <h1 className="font-semibold text-2xl">Главная страница</h1>

      <div className="grid xl:grid-cols-2 gap-6 justify-center mx-8">
        {user?.canCreateBoards && <CreateBoardCard />}

        {user?.canViewStats && (
          <Link to="/dashboard">
            <ActionCard
              title="Посмотреть статистику"
              description="Оценки и прогресс учеников"
              icon={<ChartBar size={64} />}
            />
          </Link>
        )}

        {user?.canManageSkills && (
          <Link to="/manage/skills">
            <ActionCard
              title="Настройка навыков"
              description="Добавляйте и редактируйте список навыков"
              icon={<Settings2 size={64} />}
            />
          </Link>
        )}

        {user?.canManageUsers && (
          <Link to="/manage/users">
            <ActionCard
              title="Управление пользователями"
              description="Добавляйте преподавателей и учеников"
              icon={<User size={64} />}
            />
          </Link>
        )}
      </div>
    </div>
  );
}
