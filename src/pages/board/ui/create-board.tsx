import classes from './create-board.module.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select } from '@/shared/ui';
import { BoardFeature } from '@/features/board';
import { GroupFeature } from '@/features/group';
import { BehaviorSetFeature } from '@/features/behavior-set';
import { useDispatch, useSelector } from 'react-redux';

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

  const dispatch = useDispatch();
  const groupsState = useSelector(GroupFeature.selectors.selectGroups);
  const behaviorSetsState = useSelector(BehaviorSetFeature.selectors.selectBehaviorSets);

  useEffect(() => {
    dispatch(GroupFeature.actions.fetchGroups());
    dispatch(BehaviorSetFeature.actions.fetchBehaviorSets());
  }, [dispatch]);

  const onSubmit = handleSubmit((data) => {
    dispatch(
      BoardFeature.actions.setBoard({
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
