import { Expose } from 'class-transformer';
import { UserType } from '../../../types/user.type.js';

export class LoggedUserRdo {
  @Expose()
    token: string;

  @Expose()
    email: string;

  @Expose()
    avatar: string;

  @Expose()
    name: string;

  @Expose()
    type: UserType;
}
