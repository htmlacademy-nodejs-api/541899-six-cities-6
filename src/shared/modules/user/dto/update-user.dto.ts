import { UserType } from '../../../types/user.type.js';

export class UpdateUserDto {
  public avatar?: string;
  public name?: string;
  public userType?: UserType;
  public favorites?: string[];
}
