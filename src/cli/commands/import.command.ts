import { Command } from '../interfaces/command.interface.js';
import { TsvFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { paintText } from '../../shared/helpers/support-functions.js';
import { formateToRentals } from '../../shared/helpers/offer-formating-functions.js';

export class ImportCommand implements Command {
  getCommandName(): string {
    return '--import';
  }

  async execute(...parameters: string[]) {
    const [filePath] = parameters;
    const fileReader = new TsvFileReader(filePath.trim());
    fileReader.on('lineCompleted', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(paintText('error', `Не удалось импортировать данные из файла: ${filePath}`));
      console.error(paintText('error', `Детали ошибки: ${error.message}`));
    }
  }

  private onImportedLine(line: string) {
    console.log(paintText('content', JSON.stringify(formateToRentals(line))));
  }

  private onCompleteImport(count: number) {
    console.log(paintText('content', `Импортировано ${count} рядов`));
  }
}
