import {createWriteStream, WriteStream} from 'node:fs';
import { FileWriter } from '../../interfaces/file-writer.interface.js';

export class TsvFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  async write(row: string): Promise<unknown> {
    const isWrittenSuccessfully = this.stream.write(`${row}\n`);

    if (!isWrittenSuccessfully) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
