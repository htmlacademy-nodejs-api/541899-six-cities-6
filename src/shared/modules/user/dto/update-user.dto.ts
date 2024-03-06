import { UserType } from '../../../types/user.type.js';

export class UpdateUserDto {
  avatar?: string;
  name?: string;
  userType?: UserType;
  favorites?: string[];
}
