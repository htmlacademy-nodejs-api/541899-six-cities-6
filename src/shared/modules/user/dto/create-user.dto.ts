import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  name: string;
  email: string;
  avatar: string;
  userType: UserType;
  password: string;
}
