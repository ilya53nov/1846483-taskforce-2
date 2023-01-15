export const DEFAULT_COMMENT_COUNT_LIMIT = 50;

export const NOT_OWNER = 'Вы не можете удалить чужой комментарий';

export const CommentApiProperty = {
  Text: {
    description: 'Текст комментария',
    example: 'Всё очень круто',
  },
  TaskId: {
    description: 'Индификатор задачи',
    example: '0ad49542-d41a-4388-b023-20f7b8f9c534',    
  }
}

export const CommentValidation = {
  CommentLength: {
    min: 10,
    max: 300,
  },
}
