import { SigninForm } from './signin-form';

export function SigninPage() {
  return (
    <div className="flex flex-col items-center mt-64 mx-4">
      <h1 className="font-semibold text-2xl mb-8">Вход в систему</h1>

      <SigninForm />
    </div>
  );
}
