import { Command } from '../interfaces/command.interface.js';
import { paintText } from '../../shared/helpers/support-functions.js';

export class HelpCommand implements Command {
  getCommandName(): string {
    return '--help';
  }

  async execute(): Promise<void> {
    console.info(`
      ${paintText('header', 'The app for preparing data for REST API server')}
      ${paintText('subheader', 'Usage example:')}
        ${paintText('content', 'cli.js --<command> [--arguments]')}
      ${paintText('subheader', 'Available commands:')}
        ${paintText('content', '--version:                      # shows app\'s version number')}
        ${paintText('content', '--help:                         # shows this info')}
        ${paintText('content', '--import <path>:                # imports data from .tsv file')}
        ${paintText('content', '--generate <n> <path> <url>:    # generates selected quantity of mock data')}
    `);
  }
}
