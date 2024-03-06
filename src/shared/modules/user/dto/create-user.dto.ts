import { UserType, UserTypeEnum } from '../../../types/user.type.js';
import { CREATE_USER_MESSAGES } from './create-user.messages.js';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import {
  MAX_USER_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_USER_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../constants/user.constants.js';

export class CreateUserDto {
  @IsString({ message: CREATE_USER_MESSAGES.NAME.INVALID_FORMAT })
  @Length(MIN_USER_NAME_LENGTH, MAX_USER_NAME_LENGTH, { message: CREATE_USER_MESSAGES.NAME.WRONG_FIELD_LENGTH })
    name: string;

  @IsEmail({}, { message: CREATE_USER_MESSAGES.EMAIL.INVALID_FORMAT })
    email: string;

  @IsEnum(UserTypeEnum, { message: CREATE_USER_MESSAGES.TYPE.INVALID_FORMAT })
    type: UserType;

  @IsString({ message: CREATE_USER_MESSAGES.PASSWORD.INVALID_FORMAT })
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, { message: CREATE_USER_MESSAGES.PASSWORD.WRONG_FIELD_LENGTH })
    password: string;
}
