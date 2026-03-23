import classes from './login-page.module.css';
import { useAppDispatch } from '@/app/store';
import { SessionModel } from '@/entities/session';
import { useForm } from 'react-hook-form';

const defaultValues = {
  username: '',
  password: '',
};

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(SessionModel.actions.logIn(data));
  });

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Вход в систему</h1>

      <form className={classes.form} onSubmit={onSubmit}>
        <div className={classes.loginField}>
          <label className={classes.label} htmlFor="username">
            Логин
          </label>

          <input
            className={classes.input}
            type="text"
            id="username"
            autoComplete="username"
            {...register('username', { required: 'Введите логин' })}
          />

          {errors.username && (
            <span className={classes.errorMessage}>{errors.username.message}</span>
          )}
        </div>

        <div className={classes.passwordField}>
          <label className={classes.label} htmlFor="password">
            Пароль
          </label>

          <input
            className={classes.input}
            type="password"
            id="password"
            autoComplete="current-password"
            {...register('password', { required: 'Введите пароль' })}
          />

          {errors.password && (
            <span className={classes.errorMessage}>{errors.password.message}</span>
          )}
        </div>

        <button className={classes.button} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
