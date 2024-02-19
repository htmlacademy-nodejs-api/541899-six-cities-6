import * as crypto from 'node:crypto';

export const createSHA256 = (line: string, key: string): string => {
  const shaHasher = crypto.createHmac('sha256', key);
  return shaHasher.update(line).digest('hex');
};
