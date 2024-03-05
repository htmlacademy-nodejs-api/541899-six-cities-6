import { IsEmail, IsString } from 'class-validator';
import { LoginUserMessage } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: LoginUserMessage.email.invalidFormat })
    email: string;

  @IsString({ message: LoginUserMessage.password.invalidFormat })
    password: string;
}
