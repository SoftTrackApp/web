import classes from './add-group-dialog.module.css';
import { X } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Dialog } from '@/shared/ui/dialog/dialog';
import { Typography } from '@/shared/ui/typography/typography';
import { Button } from '@/shared/ui/button/button';
import { Label } from '@/shared/ui/label/label';
import { Input } from '@/shared/ui/input/input';
import { ErrorMessage } from '@/shared/ui/error-message/error-message';

interface AddGroupDialogProps {
  onClose?: () => void;
  onSubmit?: (name: string) => void;
}

type Inputs = {
  name: string;
};

export function AddGroupDialog({ onClose, onSubmit }: AddGroupDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const submit: SubmitHandler<Inputs> = ({ name }) => {
    onSubmit?.(name.trim());
    onClose?.();
  };

  return (
    <Dialog onClose={onClose}>
      <div className={classes.top}>
        <Typography variant="h3">Новая группа</Typography>
        <Button variant="icon" size="sm" onClick={onClose}>
          <X />
        </Button>
      </div>

      <form className={classes.form} onSubmit={handleSubmit(submit)}>
        <div className={classes.field}>
          <Label htmlFor="group-name">Название</Label>
          <Input
            placeholder="Введите название группы"
            id="group-name"
            error={errors.name !== undefined}
            {...register('name', { required: 'Введите название группы' })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <Button type="submit" size="lg">
          Добавить
        </Button>
      </form>
    </Dialog>
  );
}