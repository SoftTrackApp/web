import classes from './create-model-dialog.module.css';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { Dialog } from '@/shared/ui/dialog';
import { Typography } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { ErrorMessage } from '@/shared/ui/error-message';
import { Select } from '@/shared/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { BehaviorSetEntity } from '@/entities/behavior-set';
import { GroupEntity } from '@/entities/group';
import { BoardEntity } from '@/entities/board';

interface CreateBoardDialogProps {
  onClose?: () => void;
}

type Inputs = {
  name: string;
  group: {
    label: string;
    value: number;
  };
  subgroup?: {
    label: string;
    value: number;
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

  const behaviorSets = useSelector(BehaviorSetEntity.selectors.selectBehaviorSets);
  const groups = useSelector(GroupEntity.selectors.selectGroups);

  useEffect(() => {
    dispatch(BehaviorSetEntity.actions.fetchBehaviorSets());
    dispatch(GroupEntity.actions.fetchGroups());
  }, [dispatch]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      BoardEntity.actions.setBoard({
        name: data.name,
        group: data.group.value,
        behaviorSetId: data.behaviorSet.value,
      }),
    );
  };

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
                options={groups.academicGroups.map((group) => ({
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
                options={groups.otherGroups.map((group) => ({
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
