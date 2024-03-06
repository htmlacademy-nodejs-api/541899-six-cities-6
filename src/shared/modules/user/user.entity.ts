import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/hash.js';
import { User, UserType } from '../../types/user.type.js';
import { Types } from 'mongoose';

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
    type: UserType;

  @prop({
    type: Types.ObjectId,
    default: [],
  })
    favoriteOffers: Types.Array<Types.ObjectId>;

  @prop({ required: true, default: '' })
    password: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.type = userData.type;
  }

  setPassword(password: string, key: string) {
    this.password = createSHA256(password, key);
  }

  verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
