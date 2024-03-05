import { UserEntity } from '../user/user.entity.js';
import { LoginUserDto } from '../user/dto/login-user.dto.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>;
  verify(dto: LoginUserDto): Promise<UserEntity>;
}
