import fs from 'fs';
import path from 'path';

import { getBotPath } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';

export const getVersionNumFromPackageJson = (): string => {
  try {
    const packageJsonFile = path.join(getBotPath(), '../../package.json');
    const packageString = fs.readFileSync(packageJsonFile, 'utf8');
    const pkg = JSON.parse(packageString);
    return pkg.version;
  } catch (ex) {
    getLog().e(`Unable to get version from package.json. Err: ${ex}`);
    return '0.0.0';
  }
};
