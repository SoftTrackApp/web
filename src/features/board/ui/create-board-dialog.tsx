import classes from './create-model-dialog.module.css';
import { X } from 'lucide-react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Dialog } from '@/shared/ui/dialog';
import { Typography } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { ErrorMessage } from '@/shared/ui/error-message';
import { Select } from '@/shared/ui/select';
import { useDispatch } from 'react-redux';
import { BoardEntity } from '@/entities/board';
import { useBehaviorSets } from '@/entities/behavior-set';
import { useAcademicGroups, useOtherGroups } from '@/entities/group';

interface CreateBoardDialogProps {
  onClose?: () => void;
}

type Inputs = {
  name: string;
  group: {
    label: string;
    value: string;
  };
  subgroup?: {
    label: string;
    value: string;
  };
  behaviorSet: {
    label: string;
    value: number;
  };
};

export function CreateBoardDialog({ onClose }: CreateBoardDialogProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const dispatch = useDispatch();

  const behaviorSets = useBehaviorSets();

  const academicGroups = useAcademicGroups();
  const otherGroups = useOtherGroups();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      BoardEntity.actions.setBoard({
        name: data.name,
        users: [],
        groupName1: data.group.value,
        groupName2: data.subgroup?.value,
        behaviorSetId: data.behaviorSet.value,
      }),
    );
  };

  if (behaviorSets.isPending) return null;
  if (behaviorSets.error) return <span>{behaviorSets.error.message}</span>;

  if (academicGroups.isPending) return null;
  if (academicGroups.error) return <span>{academicGroups.error.message}</span>;

  if (otherGroups.isPending) return null;
  if (otherGroups.error) return <span>{otherGroups.error.message}</span>;

  return (
    <Dialog onClose={onClose}>
      <div className={classes.top}>
        <Typography variant="h3">Создание доски оценивания</Typography>
        <Button variant="icon" size="sm" onClick={onClose}>
          <X />
        </Button>
      </div>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.field}>
          <Label htmlFor="name">Название</Label>
          <Input
            placeholder="Введите название"
            id="name"
            error={errors.name !== undefined}
            {...register('name', { required: 'Введите название' })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className={classes.field}>
          <Label htmlFor="group">Группа</Label>

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
                options={academicGroups.data.map((group) => ({
                  label: group.name,
                  value: group.name,
                }))}
              />
            )}
          />

          {errors.group && <ErrorMessage>{errors.group.message}</ErrorMessage>}
        </div>

        <div className={classes.field}>
          <Label htmlFor="subgroup">Подгруппа</Label>

          <Controller
            name="subgroup"
            control={control}
            render={({ field }) => (
              <Select
                id="subgroup"
                placeholder="Выберите группу"
                value={field.value}
                onChange={field.onChange}
                options={otherGroups.data.map((group) => ({
                  label: group.name,
                  value: group.name,
                }))}
                isClearable
              />
            )}
          />

          {errors.subgroup && <ErrorMessage>{errors.subgroup.message}</ErrorMessage>}
        </div>

        <div className={classes.field}>
          <Label htmlFor="behavior-set">Набор поведений</Label>

          <Controller
            name="behaviorSet"
            control={control}
            rules={{ required: 'Выберите набор поведений' }}
            render={({ field }) => (
              <Select
                id="behavior-set"
                placeholder="Выберите набор поведений"
                value={field.value}
                onChange={field.onChange}
                options={behaviorSets.data.map((bs) => ({
                  label: bs.name,
                  value: bs.id,
                }))}
              />
            )}
          />

          {errors.behaviorSet && <ErrorMessage>{errors.behaviorSet.message}</ErrorMessage>}
        </div>

        <Button type="submit" size="lg">
          Создать
        </Button>
      </form>
    </Dialog>
  );
}
