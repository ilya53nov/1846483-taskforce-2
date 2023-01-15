import { Injectable } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { NOT_OWNER } from './comment.constant';
import { CommentEntity } from './comment.entity';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './query/comment.query';
import { CommentRdo } from './rdo/comment.rdo';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentsRepository) {}

  public async create(userId: string, createCommentDto: CreateCommentDto) {
    const comment = {...createCommentDto, userId};
    const commentEntity = new CommentEntity(comment);
    const newComment = this.commentRepository.create(commentEntity);

    return fillObject(CommentRdo, newComment);
  }

  public async getCommentsTask(taskId: string, query: CommentQuery) {
    const existComments = await this.commentRepository.findByTask(taskId, query);

    return existComments.map((comment) => fillObject(CommentRdo, comment));
  }

  public async deleteComment(commentId: string, userId: string) {
    const comment = await this.commentRepository.findById(commentId);

    if (comment.userId !== userId) {
      throw new Error(NOT_OWNER);
    }

    await this.commentRepository.destroy(commentId);
  }

}
