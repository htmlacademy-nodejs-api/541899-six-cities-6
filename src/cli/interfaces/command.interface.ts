export interface Command {
  getCommandName(): string;
  execute(...parameters: string[]): void;
}
