export enum AuthUserDescription {
  NotFound = 'Пользователь не найден.',
  Exists = 'Пользователь с данной электронной почтой уже существует.',
  PasswordWrong = 'Не верный пароль.',
  PasswordOrLoginWrong = 'Не верный логин или пароль.',
  Created = 'Новый пользователь успешно создан.',
  Logged = 'Пользователь успешно вошёл в систему.',
  EmailNotValid = 'Не валидная электронная почта.',
  BirthNotValid = 'Не валидная дата рождения',
  InvalidAge = 'Пользователь должен быть старше 18 лет',
  AccessDenied = 'Доступ запрещён',
  InvalidTypeAvatar = 'Не верный тип аватара',
}

export const UserValidation = {
  NameLength: {
    min: 3,
    max: 50,
  },
  PasswordLength: {
    min: 6,
    max: 12,
  },
  Age: {
    min: 18,
  },
  InfoLength: {
    max: 300,
  },
  Avatar: {
    maxSize: 500 * 1024,
    fileType: /image\/(jpeg|png)$/,
  }

}

export const AUTHORIZATION_BEARER = 'Bearer';
