import { Entity } from '@taskforce/core';
import { Comment} from '@taskforce/shared-types';

export class CommentEntity implements Entity<CommentEntity>, Comment {
  text: string;
  id?: string;
  taskId: string;
  userId: string;
  createdAt: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: Comment) {
    this.id = comment.id;
    this.text = comment.text;
    this.taskId = comment.taskId;
    this.userId = comment.userId;
    this.createdAt = comment.createdAt;
  }  
}
