import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class CommentRdo {
  @Expose()
    id: string;

  @Expose()
    text: string;

  @Expose()
    rating: number;

  @Expose({ name: 'createdAt'})
    date: string;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
    user: UserRdo;
}
