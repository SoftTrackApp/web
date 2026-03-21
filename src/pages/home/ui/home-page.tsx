import { ChartBar, Plus, Settings2, User } from 'lucide-react';
import { ActionCard } from './action-card';
import { Link } from '@tanstack/react-router';
import { useAppSelector } from '@/app/store';
import { Dialog } from '@/shared/ui/dialog';
import { Button, Input } from '@/shared/ui';

export function HomePage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex items-center xl:justify-center mx-auto h-full flex-col gap-16 mt-38">
      <h1 className="font-semibold text-2xl">Главная страница</h1>

      <div className="grid xl:grid-cols-2 gap-6 justify-center mx-8">
        {user?.canCreateBoards && (
          <Dialog
            trigger={
              <ActionCard
                title="Создать доску оценивания"
                description="Начните отмечать soft skills учеников"
                icon={<Plus size={64} />}
              />
            }
          >
            <h1 className="mb-6 text-center font-semibold text-2xl">
              Создание доски оценивания
            </h1>

            <form className="flex flex-col gap-4">
              <Input placeholder="Название" />
              <Input placeholder="Группа" />
              <Input placeholder="Набор поведений" />
              <Button type="submit">Создать</Button>
            </form>
          </Dialog>
        )}

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
