import { User } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  id: string;

  @Expose()
  text: string;

  @Expose()
  author: User;

  @Expose()
  createdAt: Date;
}
