import { Expose } from 'class-transformer';
import { UserType } from '../../../types/user.type.js';

export class UserRdo {
  @Expose()
    id: string;

  @Expose()
    name: string;

  @Expose()
    email: string ;

  @Expose()
    avatar: string;

  @Expose()
    type: UserType;
}
