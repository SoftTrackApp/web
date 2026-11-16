import classes from './add-participant-dialog.module.css';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Dialog } from '@/shared/ui/dialog/dialog';
import { Typography } from '@/shared/ui/typography/typography';
import { Button } from '@/shared/ui/button/button';
import { Label } from '@/shared/ui/label/label';
import { Input } from '@/shared/ui/input/input';
import { Select } from '@/shared/ui/select/select';
import { ErrorMessage } from '@/shared/ui/error-message/error-message';
import {
  roleLabels,
  roleOrder,
  type ParticipantRole,
} from '@/entities/participant';

interface AddParticipantDialogProps {
  onClose?: () => void;
  initialName?: string;
  initialSurname?: string;
  initialRole?: ParticipantRole;
}

type Inputs = {
  name: string;
  surname: string;
};

export function AddParticipantDialog({
  onClose,
  initialName = '',
  initialSurname = '',
  initialRole,
}: AddParticipantDialogProps) {
  const [role, setRole] = useState<ParticipantRole | null>(initialRole ?? null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { name: initialName, surname: initialSurname },
  });

  const onSubmit: SubmitHandler<Inputs> = () => {
    onClose?.();
  };

  return (
    <Dialog onClose={onClose}>
      <div className={classes.top}>
        <Typography variant="h3">Новый участник</Typography>
        <Button variant="icon" size="sm" onClick={onClose}>
          <X />
        </Button>
      </div>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.field}>
          <Label htmlFor="name">Имя</Label>
          <Input
            placeholder="Введите имя"
            id="name"
            error={errors.name !== undefined}
            {...register('name', { required: 'Введите имя' })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className={classes.field}>
          <Label htmlFor="surname">Фамилия</Label>
          <Input
            placeholder="Введите фамилию"
            id="surname"
            error={errors.surname !== undefined}
            {...register('surname', { required: 'Введите фамилию' })}
          />
          {errors.surname && (
            <ErrorMessage>{errors.surname.message}</ErrorMessage>
          )}
        </div>

        <div className={classes.field}>
          <Label>Роль</Label>
          <Select
            placeholder="Выберите роль"
            options={roleOrder.map((item) => ({
              value: item,
              label: roleLabels[item],
            }))}
            value={role ? { value: role, label: roleLabels[role] } : null}
            onChange={(option) => setRole(option?.value ?? null)}
            isSearchable={false}
          />
        </div>

        <Button type="submit" size="lg">
          Добавить
        </Button>
      </form>
    </Dialog>
  );
}
