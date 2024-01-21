import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Command } from '../interfaces/command.interface.js';
import { isPackageJSONConfig, paintText } from '../../shared/support-functions.js';

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  getCommandName(): string {
    return '--version';
  }

  async execute(..._parameters: string[]): Promise<void> {
    try {
      console.log(paintText('content', `Версия приложения: ${this.readVersion()}`));
    } catch (error: unknown) {
      console.log(paintText('error', `Не удалось считать версию из ${this.filePath}`));

      if (error instanceof Error) {
        console.log(paintText('error', 'error.message'));
      }
    }
  }

  private readVersion() {
    const importedContent: unknown = JSON.parse(readFileSync(resolve(this.filePath), 'utf-8'));

    if (!isPackageJSONConfig(importedContent)) {
      throw new Error(paintText('error', 'Ошибка при парсинге JSON'));
    }

    return importedContent.version;
  }
}
