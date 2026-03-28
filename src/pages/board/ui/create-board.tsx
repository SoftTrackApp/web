import { useForm } from 'react-hook-form';
import { Button, Input, Select } from '@/shared/ui';
import { BoardEntity } from '@/entities/board';
import { useAppDispatch, useAppSelector } from '@/app/store';
import classes from './create-board.module.css';
import { useEffect } from 'react';
import { GroupEntity } from '@/entities/group';

const defaultValues = {
  name: '',
  group: '24-11',
  skillset: '1',
};

export function CreateBoard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useAppDispatch();
  const groupsState = useAppSelector((state) => state.groups);

  useEffect(() => {
    dispatch(GroupEntity.actions.fetchGroups());
  }, [dispatch]);

  const onSubmit = handleSubmit((data) => {
    dispatch(BoardEntity.actions.setBoard(data));
  });

  if (groupsState.loading || !groupsState.groups) return null;

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Создание доски оценивания</h1>

      <form onSubmit={onSubmit}>
        <div className={classes.field}>
          <label className={classes.label} htmlFor="name">
            Название
          </label>

          <Input
            className={classes.input}
            type="text"
            id="name"
            {...register('name', { required: 'Введите название' })}
          />

          {errors.name && <span className={classes.errorMessage}>{errors.name.message}</span>}
        </div>

        <div className={classes.field}>
          <label className={classes.label} htmlFor="group">
            Группа
          </label>

          <Select id="group" {...register('group')}>
            {groupsState.groups.map((group) => (
              <option key={group.id} value={group.name}>
                {group.name}
              </option>
            ))}
          </Select>
        </div>

        <div className={classes.lastField}>
          <label className={classes.label} htmlFor="skillset">
            Набор поведений
          </label>

          <Select id="skillset" {...register('skillset')}>
            <option value="1">Набор #1</option>
            <option value="2">Набор #2</option>
            <option value="3">Набор #3</option>
            <option value="4">Набор #4</option>
          </Select>
        </div>

        <Button type="submit">Создать</Button>
      </form>
    </div>
  );
}
