import { Middleware } from '../index.js';
import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';

export class UploadFileMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
    private allowedTypes: string[],
    private fileAmount?: number,
  ) {}

  async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const fileExtention = extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${fileExtention}`);
      }
    });

    const uploadFileMiddleware = multer({
      storage, fileFilter: (_req, file, callback) => {
        if (!this.allowedTypes.includes(file.mimetype)) {
          return callback(new Error(`${file.mimetype} is not allowed. Only .jpg and .png allowed`));
        }
        callback(null, true);
      }
    });

    if (this.fileAmount) {
      return uploadFileMiddleware.array(this.fieldName, this.fileAmount)(req, res, next);
    }

    uploadFileMiddleware.single(this.fieldName)(req, res, next);
  }
}
