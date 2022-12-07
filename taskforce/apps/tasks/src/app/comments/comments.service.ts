import { Injectable } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CommentEntity } from './comment.entity';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}

  public async create(idUser: string, createCommentDto: CreateCommentDto) {
    const comment = {...createCommentDto, userId: idUser};
    const commentEntity = new CommentEntity(comment);
    const newComment = this.commentRepository.create(commentEntity);

    return fillObject(CommentRdo, newComment);
  }

  public async getCommentsTask(idTask: string) {
    const existComments = await this.commentRepository.findByTask(idTask);

    return existComments.map((comment) => fillObject(CommentRdo, comment));
  }

  public async deleteComment(idComment: string) {
    await this.commentRepository.destroy(idComment);
  }

}
