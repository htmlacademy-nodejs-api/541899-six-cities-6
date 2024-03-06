export enum UserTypeEnum {
  basic,
  pro
}

export type UserType = keyof UserTypeEnum;

export type User = {
  name: string;
  email: string;
  avatar: string;
  type: UserType;
};
