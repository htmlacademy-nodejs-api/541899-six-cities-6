import { Command } from '../interfaces/command.interface.js';
import { paintText } from '../../shared/helpers/support-functions.js';
import got from 'got';
import { MockServerDataType } from '../../shared/types/index.js';
import { TsvOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { TsvFileWriter } from '../../shared/libs/file-writer/tsv-file-writer.js';

export class GenerateCommand implements Command {
  private initialData: MockServerDataType;

  getCommandName(): string {
    return '--generate';
  }

  async execute(...parameters: string[]): Promise<void> {
    const [generatingOffersCount, filePath, dataServerUrl] = parameters;
    const offerCount = Number.parseInt(generatingOffersCount, 10);

    try {
      await this.load(dataServerUrl);
      await this.write(filePath, offerCount);

      console.log(paintText('content', `Файл ${filePath} успешно создан!`));
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.log(paintText('error', 'Не удалось сгенерировать файл'));
    }
  }

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Не удалость получить данные с ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TsvOfferGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }
}
