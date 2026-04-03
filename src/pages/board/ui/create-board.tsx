import classes from './create-board.module.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select } from '@/shared/ui';
import { BoardEntity } from '@/entities/board';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { GroupEntity } from '@/entities/group';
import { BehaviorSetEntity } from '@/entities/behavior-set';

const defaultValues = {
  name: '',
  group: '',
  behaviorSetId: '',
};

export function CreateBoard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useAppDispatch();
  const groupsState = useAppSelector((state) => state.groups);
  const behaviorSetsState = useAppSelector((state) => state.behaviorSets);

  useEffect(() => {
    dispatch(GroupEntity.actions.fetchGroups());
    dispatch(BehaviorSetEntity.actions.fetchBehaviorSets());
  }, [dispatch]);

  const onSubmit = handleSubmit((data) => {
    dispatch(
      BoardEntity.actions.setBoard({
        ...data,
        behaviorSetId: Number(data.behaviorSetId),
        selectedUserId: 0,
      }),
    );
  });

  if (groupsState.loading || !groupsState.groups) return null;
  if (behaviorSetsState.loading || !behaviorSetsState.behaviorSets) return null;

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

          <Select id="group" {...register('group', { required: 'Выберите группу' })}>
            {groupsState.groups.map((group) => (
              <option key={group.id} value={group.name}>
                {group.name}
              </option>
            ))}
          </Select>

          {errors.group && <span className={classes.errorMessage}>{errors.group.message}</span>}
        </div>

        <div className={classes.lastField}>
          <label className={classes.label} htmlFor="behavior-set">
            Набор поведений
          </label>

          <Select
            id="behavior-set"
            {...register('behaviorSetId', { required: 'Выберите набор поведений' })}
          >
            {behaviorSetsState.behaviorSets.map((behaviorSet) => (
              <option key={behaviorSet.id} value={behaviorSet.id}>
                {behaviorSet.name}
              </option>
            ))}
          </Select>

          {errors.behaviorSetId && (
            <span className={classes.errorMessage}>{errors.behaviorSetId.message}</span>
          )}
        </div>

        <Button type="submit">Создать</Button>
      </form>
    </div>
  );
}
