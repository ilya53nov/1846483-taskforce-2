import { City, UserRole } from '@taskforce/shared-types';

export const USER_ENV_FILE_PATH = 'environments/.users.env';

export const ReviewValidation = {
  TextLength: {
    min: 50,
    max: 500,
  },
  Score: {
    min: 1,
    max: 5,
  },
}

export const ReviewApiProperty = {
  Text: {
    description: 'Текст отзыва',
    example: 'Спасибо, всё очень круто',
  },
  IdCompletedTask: {
    description: 'Индификатор выполненой задачи',
    example: '1234567',
  },
  Score: {
    description: 'Оценка',
    example: '5',
  },
}

export const UserApiProperty = {
  Username: {
    description: 'Имя и фамилия пользователя',
    example: 'Иван Иванов',
  },
  Email: {
    description: 'Электронная почта пользователя',
    example: 'user@user.ru',    
  },
  City: {
    description: 'Город из списка',
    enum: City,
    example: 'Москва',
  },
  Role: {
    description: 'Роль пользователя',
    enum: UserRole,
    example: 'Исполнитель',
  },
  DateBirth: {
    description: 'Дата рождения пользователя',
    example: '1995-05-11',
  },
  Password: {
    description: 'Пароль пользователя',
    example: '123456',
  },
  NewPassword: {
    description: 'Новый пароль пользователя',
    example: '1234567',
  },
  Avatar: {
    description: 'Аватар пользователя',
    example: 'smile.jpg',
  },
  Info: {
    description: 'Информация о себе',
    example: 'Я начинающий специалист',
  },
  Specialization: {
    description: 'Список навыков пользователя',
    example: 'JS, TS',
  },
}
