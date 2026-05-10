import classes from './create-model-dialog.module.css';
import { X } from 'lucide-react';
import { Dialog } from '@/shared/ui/dialog';
import { Typography } from '@/shared/ui/typography';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';

interface CreateBoardDialogProps {
  onClose?: () => void;
}

export function CreateBoardDialog({ onClose }: CreateBoardDialogProps) {
  return (
    <Dialog onClose={onClose}>
      <div className={classes.top}>
        <Typography variant="h3">Создание доски оценивания</Typography>
        <Button variant="icon" size="sm" onClick={onClose}>
          <X />
        </Button>
      </div>

      <form className={classes.form}>
        <div className={classes.field}>
          <Label htmlFor="name">Название</Label>
          <Input placeholder="Введите название" id="name" />
        </div>

        <div className={classes.field}>
          <Label htmlFor="group">Группа</Label>
          <Input placeholder="Выберите группу" id="group" />
        </div>

        <div className={classes.field}>
          <Label htmlFor="behavior-set">Набор поведений</Label>
          <Input placeholder="Выберите набор" id="behavior-set" />
        </div>

        <Button type="submit" size="lg">
          Создать
        </Button>
      </form>
    </Dialog>
  );
}
