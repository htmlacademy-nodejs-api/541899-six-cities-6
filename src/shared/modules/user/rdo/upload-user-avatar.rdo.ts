import { Expose } from 'class-transformer';

export class UploadUserAvatarRdo {
  @Expose()
    filepath: string;
}
