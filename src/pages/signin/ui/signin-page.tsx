import classes from './signin-page.module.css';
import { Typography } from '@/shared/ui/typography/typography';
import { Label } from '@/shared/ui/label/label';
import { Input } from '@/shared/ui/input/input';
import { Button } from '@/shared/ui/button/button';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@/shared/ui/error-message/error-message';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { mapErrorCode } from '@/shared/api/errors';
import { useLogin, useSession } from '@/features/session';

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

  const session = useSession();
  const login = useLogin();

  const [showPassword, setShowPassword] = useState(false);

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

      <form
        className={classes.form}
        onSubmit={handleSubmit((data) =>
          login.mutate(data, {
            onError: () =>
              setError('root', { message: session.error?.message }),
          }),
        )}
      >
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
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <Button type="submit" size="lg">
          Войти
        </Button>

        <span className={classes.error}>
          {errors.root && (
            <ErrorMessage>{mapErrorCode(errors.root.message)}</ErrorMessage>
          )}
        </span>
      </form>
    </div>
  );
}
