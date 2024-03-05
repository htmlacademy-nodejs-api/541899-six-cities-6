import { UserType, UserTypeEnum } from '../../../types/user.type.js';
import { CreateUserMessages } from './create-user-messages.js';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import {
  MAX_USER_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_USER_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../constants/user.contstants.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(MIN_USER_NAME_LENGTH, MAX_USER_NAME_LENGTH, { message: CreateUserMessages.name.lengthField })
    name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
    email: string;

  @IsString({ message: CreateUserMessages.avatar.invalidFormat })
    avatar: string;

  @IsEnum(UserTypeEnum, { message: CreateUserMessages.type.invalidFormat })
    userType: UserType;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, { message: CreateUserMessages.password.lengthField })
    password: string;
}
