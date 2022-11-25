import { Injectable } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CommentMemoryRepository } from './comment-memory.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { CommentRdo } from './rdo/comment.rdo';

@Injectable()
export class CommentsService {
  constructor(private readonly commentRepository: CommentMemoryRepository) {}

  public async create(idUser: string, createCommentDto: CreateCommentDto) {
    const comment = {...createCommentDto, idUser: idUser};
    const commentEntity = new CommentEntity(comment);

    const newComment = this.commentRepository.create(commentEntity);

    return fillObject(CommentRdo, newComment);
  }

  public async getCommentsTask(idTask: string) {
    const existComments = await this.commentRepository.findByTask(idTask);
    const comments = existComments.map((comment) => fillObject(CommentRdo, comment));

    return comments;
  }

  public async deleteComment(idComment: string) {
    await this.commentRepository.destroy(idComment);
  }

}
