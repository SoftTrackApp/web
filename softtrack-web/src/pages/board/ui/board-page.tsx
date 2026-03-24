import classes from './board-page.module.css';
import { useForm } from 'react-hook-form';
import { Dialog } from '@/shared/ui';
import { useNavigate } from '@tanstack/react-router';

const defaultValues = {
  name: '',
  group: '',
  skillset: '',
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

            <input className={classes.input} type="text" id="name" {...register('name')} />
          </div>

          <div className={classes.field}>
            <label className={classes.label} htmlFor="group">
              Группа
            </label>

            <input className={classes.input} type="text" id="group" {...register('group')} />
          </div>

          <div className={classes.lastField}>
            <label className={classes.label} htmlFor="skillset">
              Набор поведений
            </label>

            <input className={classes.input} type="text" id="skillset" {...register('skillset')} />
          </div>

          <button className={classes.button} type="submit">
            Создать
          </button>
        </form>
      </Dialog>
    </div>
  );
}
