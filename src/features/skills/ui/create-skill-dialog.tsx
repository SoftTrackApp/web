import classes from './create-skill-dialog.module.css';
import { X } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Dialog } from '@/shared/ui/dialog/dialog';
import { Typography } from '@/shared/ui/typography/typography';
import { Button } from '@/shared/ui/button/button';
import { Label } from '@/shared/ui/label/label';
import { Input } from '@/shared/ui/input/input';
import { ErrorMessage } from '@/shared/ui/error-message/error-message';
import { Textarea } from './textarea';

interface CreateSkillDialogProps {
  onClose?: () => void;
  initialName?: string;
  initialDescription?: string;
}

type Inputs = {
  name: string;
  description?: string;
};

export function CreateSkillDialog({
  onClose,
  initialName = '',
  initialDescription = '',
}: CreateSkillDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { name: initialName, description: initialDescription },
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    alert('Пока не работает');
    onClose?.();
  };

  return (
    <Dialog onClose={onClose}>
      <div className={classes.top}>
        <Typography variant="h3">Редактирование soft skill</Typography>
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
          <Label htmlFor="description">Описание</Label>
          <Textarea
            placeholder="Введите описание"
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

        <Button type="submit" size="lg">
          Сохранить
        </Button>
      </form>
    </Dialog>
  );
}
