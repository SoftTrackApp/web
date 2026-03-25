import classes from './board-page.module.css';
import { useForm } from 'react-hook-form';
import { Button, Dialog, Input, Select } from '@/shared/ui';
import { useNavigate } from '@tanstack/react-router';

const defaultValues = {
  name: '',
  group: '24-11',
  skillset: '1',
};

export function BoardPage() {
  const { register, handleSubmit } = useForm({ defaultValues });

  const navigate = useNavigate();

  const handleDialogClose = () => {
    navigate({ to: '/' });
  };

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div>
      <Dialog onClose={handleDialogClose} initialShow>
        <h1 className={classes.dialogTitle}>Создание доски оценивания</h1>

        <form onSubmit={onSubmit}>
          <div className={classes.field}>
            <label className={classes.label} htmlFor="name">
              Название
            </label>

            <Input className={classes.input} type="text" id="name" {...register('name')} />
          </div>

          <div className={classes.field}>
            <label className={classes.label} htmlFor="group">
              Группа
            </label>

            <Select id="group" {...register('group')}>
              <option value="24-11">ИТ24-11</option>
              <option value="24-12">ИТ24-12</option>
              <option value="24-13">ИТ24-13</option>
              <option value="24-14">ИТ24-14</option>
            </Select>
          </div>

          <div className={classes.lastField}>
            <label className={classes.label} htmlFor="skillset">
              Набор поведений
            </label>

            <Select id="skillset" {...register('skillset')}>
              <option value="1">Набор #1</option>
              <option value="2">Набор #2</option>
              <option value="3">Набор #3</option>
              <option value="4">Набор #4</option>
            </Select>
          </div>

          <Button type="submit">Создать</Button>
        </form>
      </Dialog>
    </div>
  );
}
