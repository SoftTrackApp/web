import classes from './login-page.module.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { SessionModel } from '@/entities/session';
import { useNavigate } from '@tanstack/react-router';

const defaultValues = {
  username: '',
  password: '',
};

export function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ defaultValues });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { session, error } = useAppSelector((state) => state.session);

  const onSubmit = handleSubmit((data) => {
    dispatch(SessionModel.actions.logIn(data));
  });

  useEffect(() => {
    if (error) {
      setError('root', { message: error });
    }
  }, [error, setError]);

  useEffect(() => {
    if (session) {
      navigate({ to: '/' });
    }
  }, [navigate, session]);

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

        {errors.root && <span className={classes.errorMessage}>{errors.root.message}</span>}

        <button className={classes.button} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
