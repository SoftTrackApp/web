import classes from './login-page.module.css';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SessionFeature } from '@/features/session';
import { useNavigate } from '@tanstack/react-router';
import { Button, Input } from '@/shared/ui';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff } from 'lucide-react';

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

  const dispatch = useDispatch();
  const { session, error } = useSelector(SessionFeature.selectors.selectSession);

  const onSubmit = handleSubmit((data) => {
    dispatch(SessionFeature.actions.logIn(data));
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

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Вход в систему</h1>

      <form className={classes.form} onSubmit={onSubmit}>
        <div className={classes.loginField}>
          <label className={classes.label} htmlFor="username">
            Логин
          </label>

          <Input
            type="text"
            id="username"
            autoComplete="username"
            placeholder="Введите логин"
            destructive={!!errors.username}
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

          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            placeholder="Введите пароль"
            destructive={!!errors.password}
            trailingIcon={showPassword ? <EyeOff /> : <Eye />}
            onTrailingIconClick={() => setShowPassword(!showPassword)}
            {...register('password', { required: 'Введите пароль' })}
          />

          {errors.password && (
            <span className={classes.errorMessage}>{errors.password.message}</span>
          )}
        </div>

        {errors.root && <span className={classes.errorMessage}>{errors.root.message}</span>}

        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
}
