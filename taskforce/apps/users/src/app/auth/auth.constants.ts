export enum AuthUserDescription {
  NotFound = 'Пользователь не найден.',
  Exists = 'Пользователь с данной электронной почтой уже существует.',
  PasswordWrong = 'Не верный пароль.',
  PasswordOrLoginWrong = 'Не верный логин или пароль.',
  Created = 'Новый пользователь успешно создан.',
  Logged = 'Пользователь успешно вошёл в систему.',
  EmailNotValid = 'Не валидная электронная почта.',
  BirthNotValid = 'Не валидная дата рождения',
  AccessDenied = 'Доступ запрещён',
}

export const AUTHORIZATION_BEARER = 'Bearer';
