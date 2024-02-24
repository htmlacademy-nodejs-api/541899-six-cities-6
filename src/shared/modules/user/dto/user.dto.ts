import { UserType } from '../../../types/user.type.js';

export class UserDto {
  name: string;
  email: string;
  avatar: string;
  userType: UserType;
  password: string;
}
