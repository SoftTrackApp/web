import { ChartBar, Plus, Settings2, User } from 'lucide-react';
import { ActionCard } from './action-card';
import { useCurrentUser } from '@/entities/user';

export function HomePage() {
  const { user } = useCurrentUser();

  return (
    <div className="flex items-center xl:justify-center mx-auto h-full flex-col gap-16">
      <h1 className="font-semibold text-2xl">Главная страница</h1>

      <div className="grid xl:grid-cols-2 gap-6 justify-center">
        {user?.canCreateBoards && (
          <ActionCard
            title="Создать доску оценивания"
            description="Начните отмечать soft skills учеников"
            icon={<Plus size={64} />}
          />
        )}

        {user?.canViewStats && (
          <ActionCard
            title="Посмотреть статистику"
            description="Оценки и прогресс учеников"
            icon={<ChartBar size={64} />}
          />
        )}

        {user?.canManageSkills && (
          <ActionCard
            title="Настройка навыков"
            description="Добавляйте и редактируйте список навыков"
            icon={<Settings2 size={64} />}
          />
        )}

        {user?.canManageUsers && (
          <ActionCard
            title="Управление пользователями"
            description="Добавляйте преподавателей и учеников"
            icon={<User size={64} />}
          />
        )}
      </div>
    </div>
  );
}
