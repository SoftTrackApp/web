import classes from './signin-page.module.css';
import { Typography } from '@/shared/ui/typography';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

export function SigninPage() {
  return (
    <div className={classes.wrapper}>
      <Typography className={classes.heading} variant="h2">
        Вход в систему
      </Typography>

      <form className={classes.form}>
        <Label htmlFor="login">Логин</Label>
        <Input
          className={classes.loginField}
          placeholder="Введите логин"
          id="login"
          autoComplete="username"
          autoFocus
        />

        <Label htmlFor="password">Пароль</Label>
        <Input
          className={classes.passwordField}
          type="password"
          placeholder="Введите пароль"
          id="password"
          autoComplete="current-password"
        />

        <Button type="submit">Войти</Button>
      </form>
    </div>
  );
}
