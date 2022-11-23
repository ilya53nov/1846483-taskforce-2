import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  create(createCommentDto: CreateCommentDto) {
    throw new Error('Not implemented');
  }

  getCommentsTask(idTask: string) {
    throw new Error('Not implemented');
  }

}
