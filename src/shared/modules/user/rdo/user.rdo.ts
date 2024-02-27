import { Expose } from 'class-transformer';
import { UserType } from '../../../types/user.type.js';

export class UserRdo {
  @Expose()
  public name: string;

  @Expose()
  public email: string ;

  @Expose()
  public avatar: string;

  @Expose()
  public userType: UserType;
}
