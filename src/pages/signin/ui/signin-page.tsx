import classes from './signin-page.module.css';
import { Typography } from '@/shared/ui/typography';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@/shared/ui/error-message';
import { useDispatch, useSelector } from 'react-redux';
import { SessionFeature } from '@/features/session';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { mapErrorCode } from '@/shared/api';

type Inputs = {
  login: string;
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

  const [showPassword, setShowPassword] = useState(false);

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
        <div className={classes.field}>
          <Label htmlFor="login">Логин</Label>
          <Input
            placeholder="Введите логин"
            id="login"
            autoComplete="username"
            error={errors.login !== undefined}
            autoFocus
            {...register('login', { required: 'Введите логин' })}
          />
          {errors.login && <ErrorMessage>{errors.login.message}</ErrorMessage>}
        </div>

        <div className={classes.field}>
          <Label htmlFor="password">Пароль</Label>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Введите пароль"
            id="password"
            autoComplete="current-password"
            icon={showPassword ? <EyeOff /> : <Eye />}
            onIconClick={() => setShowPassword(!showPassword)}
            error={errors.password !== undefined}
            {...register('password', { required: 'Введите пароль' })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <Button type="submit" size="lg">
          Войти
        </Button>

        <span className={classes.error}>
          {errors.root && <ErrorMessage>{mapErrorCode(errors.root.message)}</ErrorMessage>}
        </span>
      </form>
    </div>
  );
}
