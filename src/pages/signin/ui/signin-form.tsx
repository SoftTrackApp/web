import { Button, Input } from '@/shared/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { User, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { signIn } from '@/entities/user';
import * as yup from 'yup';

// TODO: add more validation parameters
const schema = yup.object({
  login: yup.string().required(),
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
  const queryClient = useQueryClient();

  const { mutate: mutateSignin } = useMutation({
    mutationFn: signIn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      await navigate({ to: '/' });
    },
    onError: (error) => setError('root', error),
  });

  return (
    <form
      className="flex flex-col max-w-120 w-full"
      onSubmit={handleSubmit((data) => mutateSignin(data))}
    >
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Логин"
          autoComplete="username"
          icon={<User />}
          autoFocus
          {...register('login')}
        />

        {errors.login && <span className="text-sm">{errors.login.message}</span>}
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
