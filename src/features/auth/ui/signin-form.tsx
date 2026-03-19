import { useAppDispatch, useAppSelector } from '@/app/store';
import { Button, Input } from '@/shared/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from '@tanstack/react-router';
import { User, Lock } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// TODO: add more validation parameters
const schema = yup.object({
  username: yup.string().required(),
  password: yup.string(),
});

export function SigninForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  
  const dispatch = useAppDispatch();
  const { user, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      setError('root', { message: error });
    }
  }, [error, setError]);

  useEffect(() => {
    if (user) {
      navigate({ to: '/' });
    }
  }, [user, navigate]);

  const onSubmit = handleSubmit((data) => {
    dispatch({ type: 'USER_SIGNIN_REQUESTED', payload: data });
  });

  return (
    <form className="flex flex-col max-w-120 w-full" onSubmit={onSubmit}>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Логин"
          autoComplete="username"
          icon={<User />}
          autoFocus
          {...register('username')}
        />

        {errors.username && <span className="text-sm">{errors.username.message}</span>}
      </div>

      <div className="mb-3">
        <Input
          type="password"
          placeholder="Пароль"
          autoComplete="current-password"
          icon={<Lock />}
          {...register('password')}
        />

        {errors.password && <span className="text-sm">{errors.password.message}</span>}
      </div>

      {errors.root && <span className="mb-3">{errors.root.message}</span>}

      <Button>Войти</Button>
    </form>
  );
}
