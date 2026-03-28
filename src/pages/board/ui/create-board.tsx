import classes from './create-board.module.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select } from '@/shared/ui';
import { BoardEntity } from '@/entities/board';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { GroupEntity } from '@/entities/group';
import { SkillsetEntity } from '@/entities/skillset';

const defaultValues = {
  name: '',
  group: '',
  skillset: '',
};

export function CreateBoard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useAppDispatch();
  const groupsState = useAppSelector((state) => state.groups);
  const skillsetsState = useAppSelector((state) => state.skillsets);

  useEffect(() => {
    dispatch(GroupEntity.actions.fetchGroups());
    dispatch(SkillsetEntity.actions.fetchSkillsets());
  }, [dispatch]);

  const onSubmit = handleSubmit((data) => {
    dispatch(BoardEntity.actions.setBoard(data));
  });

  if (groupsState.loading || !groupsState.groups) return null;
  if (skillsetsState.loading || !skillsetsState.skillsets) return null;

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
          <label className={classes.label} htmlFor="skillset">
            Набор поведений
          </label>

          <Select id="skillset" {...register('skillset', { required: 'Выберите набор поведений' })}>
            {skillsetsState.skillsets.map((skillset) => (
              <option key={skillset.id} value={skillset.name}>
                {skillset.name}
              </option>
            ))}
          </Select>

          {errors.skillset && (
            <span className={classes.errorMessage}>{errors.skillset.message}</span>
          )}
        </div>

        <Button type="submit">Создать</Button>
      </form>
    </div>
  );
}
