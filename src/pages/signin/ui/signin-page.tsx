import classes from './signin-page.module.css';
import { Typography } from '@/shared/ui/typography';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@/shared/ui/error-message';
import { Field } from '@/shared/ui/field';
import { useDispatch, useSelector } from 'react-redux';
import { SessionFeature } from '@/features/session';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

type Inputs = {
  username: string;
  password: string;
};

export function SigninPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const session = useSelector(SessionFeature.selectors.selectSession);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(SessionFeature.actions.logIn(data));
  };

  useEffect(() => {
    if (session.error) {
      setError('root', { message: session.error });
    }
  }, [session.error, setError]);

  useEffect(() => {
    if (session.data) {
      navigate('/');
    }
  }, [session.data, navigate]);

  return (
    <div className={classes.wrapper}>
      <Typography className={classes.heading} variant="h2">
        Вход в систему
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Field className={classes.usernameField}>
          <Label htmlFor="login">Логин</Label>
          <Input
            variant={errors.username ? 'error' : 'default'}
            placeholder="Введите логин"
            id="login"
            autoComplete="username"
            autoFocus
            {...register('username', { required: 'Введите логин' })}
          />
          {errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
        </Field>

        <Field className={classes.passwordField}>
          <Label htmlFor="password">Пароль</Label>
          <Input
            variant={errors.password ? 'error' : 'default'}
            type="password"
            placeholder="Введите пароль"
            id="password"
            autoComplete="current-password"
            {...register('password', { required: 'Введите пароль' })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </Field>

        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
}
