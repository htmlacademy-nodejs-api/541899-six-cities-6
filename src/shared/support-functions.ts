import { PackageJSONConfig, ParsedCommand } from './types/index.js';
import chalk from 'chalk';

export function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
      value !== null &&
      Object.hasOwn(value, 'version')
  );
}

export function getParsedCommands(cliArguments: string[]): ParsedCommand {
  const parsedCommand: ParsedCommand = {};
  let currentCommand = '';

  for (const argument of cliArguments) {
    if (argument.startsWith('--')) {
      parsedCommand[argument] = [];
      currentCommand = argument;
    } else if (currentCommand && argument) {
      parsedCommand[currentCommand].push(argument);
    }
  }

  return parsedCommand;
}

function getAppColors() {
  return {
    'headerColor': chalk.hex('#708090'),
    'subheaderColor': chalk.hex('#D2691E'),
    'contentColor': chalk.hex('#DAA520'),
    'errorColor': chalk.hex('#8B0000'),
  };
}

export function paintText(textType: 'header' | 'subheader' | 'content' | 'error', text: unknown): string {
  const appColors = getAppColors();

  switch (textType) {
    case 'header':
      return appColors.headerColor(text);
    case 'subheader':
      return appColors.subheaderColor(text);
    case 'content':
      return appColors.contentColor(text);
    case 'error':
      return appColors.errorColor(text);
  }

  throw new Error('Didn\'t expect to get here');
}
