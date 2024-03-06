import { IsEmail, IsString } from 'class-validator';
import { LOGIN_USER_MESSAGE } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: LOGIN_USER_MESSAGE.EMAIL.INVALID_FORMAT })
    email: string;

  @IsString({ message: LOGIN_USER_MESSAGE.PASSWORD.INVALID_FORMAT })
    password: string;
}
