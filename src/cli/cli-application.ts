import { CommandsCollection } from './types/commands-collection.type.js';
import { Command } from './interfaces/command.interface.js';
import { getParsedCommands } from '../shared/helpers/support-functions.js';

export class CLIApplication {
  private commands: CommandsCollection = {};

  constructor(private readonly defaultCommand: string = '--help') {
  }

  registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.commands, command.getCommandName())) {
        throw new Error(`Command ${command.getCommandName()} is already registered`);
      }

      this.commands[command.getCommandName()] = command;
    });
  }

  getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  getDefaultCommand(): Command | never {
    const defaultCommand = this.commands[this.defaultCommand];

    if (!defaultCommand) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered`);
    }

    return defaultCommand;
  }

  processCommand(argv: string[]): void {
    const parsedCommand = getParsedCommands(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];

    command.execute(...commandArguments);
  }
}
