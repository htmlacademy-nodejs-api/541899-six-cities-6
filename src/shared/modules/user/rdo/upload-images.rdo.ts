import { Expose } from 'class-transformer';

export class UploadImagesRdo {
  @Expose()
    images: string[];
}
