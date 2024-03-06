import { UserType } from '../../../types/user.type.js';

export class UpdateUserDto {
  avatar?: string;
  name?: string;
  type?: UserType;
  favorites?: string[];
}
