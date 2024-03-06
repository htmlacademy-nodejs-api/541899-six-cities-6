import { UserTypeEnum } from '../../../types/user.type.js';
import {
  USER,
} from '../../../constants/user.constants.js';

export const CREATE_USER_MESSAGES = {
  EMAIL: {
    INVALID_FORMAT: 'email must be a valid address'
  },
  AVATAR: {
    INVALID_FORMAT: 'avatar path is required',
  },
  NAME: {
    INVALID_FORMAT: 'name is required',
    WRONG_FIELD_LENGTH: `name length must be between ${USER.MIN_NAME_LENGTH} and ${USER.MAX_NAME_LENGTH} characters`,
  },
  PASSWORD: {
    INVALID_FORMAT: 'password is required',
    WRONG_FIELD_LENGTH: `password length must be between ${USER.MIN_PASSWORD_LENGTH} and ${USER.MAX_PASSWORD_LENGTH} characters`
  },
  TYPE: {
    INVALID_FORMAT: `type field must be "${UserTypeEnum[UserTypeEnum.basic]}" or "${UserTypeEnum[UserTypeEnum.pro]}"`
  }
} as const;
