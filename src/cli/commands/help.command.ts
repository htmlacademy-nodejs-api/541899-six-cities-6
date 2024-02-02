import { Command } from '../../shared/interfaces/command.interface.js';
import { paintText } from '../../shared/helpers/support-functions.js';

export class HelpCommand implements Command {
  getCommandName(): string {
    return '--help';
  }

  async execute(): Promise<void> {
    console.info(`
      ${paintText('header', 'Программа для подготовки данных для REST API сервера.')}
      ${paintText('subheader', 'Пример использования:')}
        ${paintText('content', 'cli.js --<command> [--arguments]')}
      ${paintText('subheader', 'Доступные команды:')}
        ${paintText('content', '--version:          # выводит номер версии')}
        ${paintText('content', '--help:             # выводит данную информацию')}
        ${paintText('content', '--import <path>:    # импортирует данные из .tsv файла')}
    `);
  }
}
