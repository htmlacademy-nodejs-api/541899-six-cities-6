import { UserType } from '../../../types/user.type.js';
import { Types } from 'mongoose';

export class UpdateUserDto {
  avatar?: string;
  name?: string;
  type?: UserType;
  favorites?: Types.Array<Types.ObjectId>;
}
