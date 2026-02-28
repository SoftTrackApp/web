import { Button, Input } from '@/shared/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { User, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
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
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form className="flex flex-col max-w-120 w-full" onSubmit={onSubmit}>
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

      <div className="mb-6">
        <Input
          type="password"
          placeholder="Пароль"
          className="mb-10"
          autoComplete="current-password"
          icon={<Lock />}
          {...register('password')}
        />

        {errors.password && <span className="text-sm">{errors.password.message}</span>}
      </div>

      <Button>Войти</Button>
    </form>
  );
}
