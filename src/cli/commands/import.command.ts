import { Command } from '../interfaces/command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { paintText } from '../../shared/support-functions.js';

export class ImportCommand implements Command {
  getCommandName(): string {
    return '--import';
  }

  execute(...parameters: string[]) {
    const [fileName] = parameters;
    const fileReader = new TSVFileReader(fileName.trim());

    try {
      fileReader.read();
      console.log(fileReader.formateToRentals());
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(paintText('error', `Не удалось импортировать данные из файла: ${fileName}`));
      console.error(paintText('error', `Детали ошибки: ${error.message}`));
    }
  }
}
