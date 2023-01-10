export const SMTP_ENV_FILE_PATH = 'environments/.smtp.env';

export enum SubscriberValidateDescription {
  EMAIL_NOT_VALID = 'Не валидная электронная почта',
  LAST_NAME_IS_EMPTY = 'Пустое поле lastname',
  FIRST_NAME_IS_EMPTY = 'Пустое поле firstname',
  USER_ID_IS_EMPTY = 'Пустое поле userId',
  EMAIL_SUBSCRIBER_EXISTS = 'Подписчик с данной электронной почтой уже существует',
}
