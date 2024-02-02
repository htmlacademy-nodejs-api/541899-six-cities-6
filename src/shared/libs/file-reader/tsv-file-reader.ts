import { FileReader } from '../../interfaces/file-reader.interface.js';
import { createReadStream } from 'node:fs';
import EventEmitter from 'node:events';

const CHUNK_SIZE = 16384;

export class TsvFileReader extends EventEmitter implements FileReader {
  constructor(
    private readonly filePath: string
  ) {
    super();
  }

  async read() {
    const readStream = createReadStream(this.filePath, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8'
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completedRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        this.emit('lineCompleted', completedRow);
      }
    }

    this.emit('end', importedRowCount);
  }
}
