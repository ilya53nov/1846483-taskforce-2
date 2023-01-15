export const DEFAULT_TASK_COUNT_LIMIT = 25;

export const USER_ENV_FILE_PATH = 'environments/.users.env';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export const TaskValidation = {
  HeaderLength: {
    min: 20,
    max: 50,
  },
  DescriptionLength: {
    min: 100,
    max: 1024,
  },
  Image: {
    fileType: /image\/(jpeg|png)$/,
    maxSize: 1024 * 1024,
  },
  AddressLength: {
    min: 10,
    max: 255,
  },
  TagLength: {
    min: 3,
    max: 10,
  },
  TagsMaxCount: 5
}

export const NOT_FOUND_TASK = 'Задача не найдена';

export const NOT_FOUND_EXECUTER = 'Исполнитель не найден';

export const BUSY_EXECUTOR = 'В данный момент исполнитель занят другой задачей';

export const INVALID_TAG = `Тег должен начинаться с буквы, минимальная длина ${TaskValidation.TagLength.min}, максимальная длина ${TaskValidation.TagLength.max}, количество тегов не должно быть больше ${TaskValidation.TagsMaxCount}`

export const NOT_OWNER = 'Вы не являетесь создателем данной задачи';

export const INVALID_EXECUTOR = 'Вы не являетесь исполнителем данной задачи';

export const INVALID_TASK_STATUS = 'Не валидный статус задания';

export const QUERY_SEPARATOR = ',';

export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
