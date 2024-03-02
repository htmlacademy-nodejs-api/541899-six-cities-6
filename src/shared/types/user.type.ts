export enum UserTypeEnum {
  'обычный',
  'pro'
}

export type UserType = keyof UserTypeEnum;

export type User = {
  name: string;
  email: string;
  avatar: string;
  userType: UserType;
};
