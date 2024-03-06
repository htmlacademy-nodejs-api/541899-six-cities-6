import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Command } from '../interfaces/command.interface.js';
import { checkIsPackageJSONConfig, paintText } from '../../shared/helpers/support-functions.js';

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  getCommandName(): string {
    return '--version';
  }

  async execute(..._parameters: string[]): Promise<void> {
    try {
      console.log(paintText('content', `The application's version: ${this.readVersion()}`));
    } catch (error: unknown) {
      console.log(paintText('error', `Failed to read the version from ${this.filePath}`));

      if (error instanceof Error) {
        console.log(paintText('error', 'error.message'));
      }
    }
  }

  private readVersion() {
    const importedContent: unknown = JSON.parse(readFileSync(resolve(this.filePath), 'utf-8'));

    if (!checkIsPackageJSONConfig(importedContent)) {
      throw new Error(paintText('error', 'Error while JSON parsing'));
    }

    return importedContent.version;
  }
}
