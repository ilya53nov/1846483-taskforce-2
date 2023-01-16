import { TaskStatus } from '@taskforce/shared-types';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export const USER_ENV_FILE_PATH = 'environments/.users.env';

export const TaskQueryParametr = {
  DefaultTaskCountLimit: 25,
  Separator: ',',
  DefaultSortDirection: SortDirection.Desc,
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
  CostMin: 0,
  TagsMaxCount: 5
}

export const TaskApiProperty = {
  UserId: {
    description: 'Индификатор пользователя',
    example: '435rete324324ewfew',
  },
  Header: {
    description: 'Заголовок задания',
    example: 'Починить плиту',
  },
  Description: {
    description: 'Описание задания',
    example: 'Не включается плита',
  },
  CategoryTitle: {
    description: 'Категория задания',
    example: 'Бытовая техника',
  },
  Cost: {
    description: 'Стоимость',
    example: '1000',
  },
  DateExecutionAt: {
    description: 'Срок исполнения',
    example: '12.12.2022',
  },
  Image: {
    description: 'Изображение',
    example: 'плита.jpg',    
  },
  Address: {
    description: 'Адрес',
    example: 'Москва, ул. Бытовой плиты, д. 2',
  },
  Tags: {
    description: 'Список тегов к заданию',
    example: 'плита, сломалась, техника',   
  },
  NewStatus: {
    description: 'Новый статус задания',
    example: 'В работе',
    enum: TaskStatus, 
  },
  ExecutorId: {
    description: 'Индификатор исполнителя',
    example: '123412412',    
  },
}

export enum TaskExceptionDescription {
  NotFound = 'Задача не найдена',
  InvalidStatus = 'Не валидный статус задания',
}

export enum UserExceptionDescription {
  NotFoundExecutor = 'Исполнитель не найден',
  BusyExecutor = 'В данный момент исполнитель занят другой задачей',
  NotOwner = 'Вы не являетесь создателем данной задачи',
  InvalidExecutor = 'Вы не являетесь исполнителем данной задачи',
}

export const INVALID_TAG = `Тег должен начинаться с буквы, минимальная длина ${TaskValidation.TagLength.min}, максимальная длина ${TaskValidation.TagLength.max}, количество тегов не должно быть больше ${TaskValidation.TagsMaxCount}`

