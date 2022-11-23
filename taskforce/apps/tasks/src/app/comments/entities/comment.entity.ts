import { Comment} from '@taskforce/shared-types';

export class CommentEntity implements Comment {
  text: string;
  idTask: string;
  _id?: string;
  idUser: string;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: Comment) {
    this._id = comment._id;
    this.text = comment.text;
    this.idTask = comment.idTask;
    this.idUser = comment.idUser;
  }  
}
