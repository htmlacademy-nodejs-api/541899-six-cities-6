import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @Expose()
    token: string;

  @Expose()
    email: string;
}
