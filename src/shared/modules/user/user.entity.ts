import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/hash.js';
import { User, UserType } from '../../types/user.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true })
    name: string;

  @prop({ required: true, unique: true })
    email: string;

  @prop({ required: false, default: '' })
    avatar: string;

  @prop({ required: true, default: 'обычный' })
    userType: UserType;

  @prop({ required: true, default: '' })
    password: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.userType = userData.userType;
  }

  setPassword(password: string, key: string) {
    this.password = createSHA256(password, key);
  }

  getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
