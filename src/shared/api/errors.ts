export function mapErrorCode(code?: string) {
  switch (code) {
    case 'UNKNOWN_ERROR':
      return 'Произошла ошибка!';
    case 'INVALID_CREDENTIALS':
      return 'Неверный логин или пароль!';

    default:
      return code ?? 'Произошла ошибка!';
  }
}
