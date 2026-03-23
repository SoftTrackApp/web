import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@/shared/ui/dialog';
import { Button, Input } from '@/shared/ui';
import { ActionCard } from './action-card';
import { useAppDispatch } from '@/app/store';
import { BoardEntity, type Board } from '@/entity/board';
import { useNavigate } from '@tanstack/react-router';

const defaultValues: Board = {
  name: '',
  group: '',
  skillSetName: '',
};

export function CreateBoardCard() {
  const { register, handleSubmit } = useForm({ defaultValues });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    dispatch(BoardEntity.actions.setBoard(data));
    navigate({ to: '/board' });
  });

  return (
    <Dialog
      trigger={
        <ActionCard
          title="Создать доску оценивания"
          description="Начните отмечать soft skills учеников"
          icon={<Plus size={64} />}
        />
      }
    >
      <h1 className="mb-6 text-center font-semibold text-2xl">Создание доски оценивания</h1>

      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Input placeholder="Название" {...register('name')} />
        <Input placeholder="Группа" {...register('group')} />
        <Input placeholder="Набор поведений" {...register('skillSetName')} />
        <Button type="submit">Создать</Button>
      </form>
    </Dialog>
  );
}
