import classes from './create-board.module.css';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Select } from '@/shared/ui';
import { BoardFeature } from '@/features/board';
import { GroupFeature } from '@/features/group';
import { BehaviorSetFeature } from '@/features/behavior-set';
import { useDispatch, useSelector } from 'react-redux';

type Option = {
  label: string;
  value: string;
};

type Inputs = {
  name: string;
  group: Option;
  behaviorSetId: Option;
};

export function CreateBoard() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

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
        name: data.name,
        group: data.group.value,
        behaviorSetId: Number(data.behaviorSetId.value),
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
            placeholder="Введите название"
            {...register('name', { required: 'Введите название' })}
          />

          {errors.name && <span className={classes.errorMessage}>{errors.name.message}</span>}
        </div>

        <div className={classes.field}>
          <label className={classes.label} htmlFor="group">
            Группа
          </label>

          <Controller
            name="group"
            control={control}
            rules={{ required: 'Выберите группу' }}
            render={({ field }) => (
              <Select
                id="group"
                placeholder="Выберите группу"
                value={field.value}
                onChange={field.onChange}
                options={groupsState.groups?.map((group) => ({
                  label: group.name,
                  value: group.id,
                }))}
              />
            )}
          />

          {errors.group && <span className={classes.errorMessage}>{errors.group.message}</span>}
        </div>

        <div className={classes.lastField}>
          <label className={classes.label} htmlFor="behavior-set">
            Набор поведений
          </label>

          <Controller
            name="behaviorSetId"
            control={control}
            rules={{ required: 'Выберите набор поведений' }}
            render={({ field }) => (
              <Select
                id="behavior-set"
                placeholder="Выберите набор поведений"
                value={field.value}
                onChange={field.onChange}
                options={behaviorSetsState.behaviorSets?.map((bs) => ({
                  label: bs.name,
                  value: bs.id,
                }))}
              />
            )}
          />

          {errors.behaviorSetId && (
            <span className={classes.errorMessage}>{errors.behaviorSetId.message}</span>
          )}
        </div>

        <Button type="submit">Создать</Button>
      </form>
    </div>
  );
}
