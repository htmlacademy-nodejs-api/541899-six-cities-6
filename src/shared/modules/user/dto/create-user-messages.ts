import { UserTypeEnum } from '../../../types/user.type.js';
import {
  MAX_PASSWORD_LENGTH,
  MAX_USER_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USER_NAME_LENGTH,
} from '../../../constants/user.contstants.js';

export const CreateUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatar: {
    invalidFormat: 'avatar path is required',
  },
  name: {
    invalidFormat: 'name is required',
    lengthField: `name length must be between ${MIN_USER_NAME_LENGTH} and ${MAX_USER_NAME_LENGTH} characters`,
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: `password length must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters`
  },
  type: {
    invalidFormat: `type field must be "${UserTypeEnum['обычный']}" or "${UserTypeEnum.pro}"`
  }
} as const;
