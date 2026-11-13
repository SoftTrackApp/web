import classes from './create-behavior-dialog.module.css';
import { X } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Dialog } from '@/shared/ui/dialog/dialog';
import { Typography } from '@/shared/ui/typography/typography';
import { Button } from '@/shared/ui/button/button';
import { Label } from '@/shared/ui/label/label';
import { Input } from '@/shared/ui/input/input';
import { ErrorMessage } from '@/shared/ui/error-message/error-message';
import { Textarea } from './textarea';

interface CreateBehaviorDialogProps {
  skillName: string;
  onClose?: () => void;
  initialName?: string;
  initialDescription?: string;
}

type Inputs = {
  name: string;
  description?: string;
};

export function CreateBehaviorDialog({
  skillName,
  onClose,
  initialName = '',
  initialDescription = '',
}: CreateBehaviorDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { name: initialName, description: initialDescription },
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    onClose?.();
  };

  return (
    <Dialog onClose={onClose}>
      <div className={classes.top}>
        <Typography variant="h3">Редактирование поведения</Typography>
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
          <Label htmlFor="description">Описание действия</Label>
          <Textarea
            placeholder="Введите описание действия"
            id="description"
            error={errors.description !== undefined}
            {...register('description', {
              maxLength: { value: 500, message: 'Максимум 500 символов' },
            })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>

        <p className={classes.hint}>
          Поведение будет добавлено в навык «{skillName}»
        </p>

        <Button type="submit" size="lg">
          Сохранить
        </Button>
      </form>
    </Dialog>
  );
}
