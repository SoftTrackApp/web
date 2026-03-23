import classes from './login-page.module.css';

export function LoginPage() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Вход в систему</h1>

      <form className={classes.form}>
        <div className={classes.loginField}>
          <label className={classes.label} htmlFor="username">
            Логин
          </label>
          <input className={classes.input} type="text" id="username" autoComplete="username" />
        </div>

        <div className={classes.passwordField}>
          <label className={classes.label} htmlFor="password">
            Пароль
          </label>
          <input
            className={classes.input}
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </div>

        <button className={classes.button} type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}
