import chalk from 'chalk';
import { ParsedCommand } from '../types/parsed-command.type.js';
import { PackageJSONConfig } from '../types/package-json-config.type.js';
import { ClassConstructor, plainToInstance } from 'class-transformer';

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

export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getRandomBoolean(): boolean {
  return Math.random() < 0.5;
}

export function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(message: string) {
  return {
    error: message,
  };
}
