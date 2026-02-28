import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { createFileRoute } from '@tanstack/react-router';
import { Lock, User } from 'lucide-react';

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center mt-64 mx-4">
      <h1 className="font-semibold text-2xl mb-8">Вход в систему</h1>

      <form className="flex flex-col max-w-120 w-full">
        <Input
          type="text"
          placeholder="Логин"
          className="mb-6"
          autoComplete="username"
          icon={<User />}
          autoFocus
        />

        <Input
          type="password"
          placeholder="Пароль"
          className="mb-10"
          autoComplete="current-password"
          icon={<Lock />}
        />

        <Button>Войти</Button>
      </form>
    </div>
  );
}
