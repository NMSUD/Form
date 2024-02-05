import fs from 'fs';
import path from 'path';

import { getBotPath } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';

interface IGenerateJsonFileProps<T> {
  items: Array<T>;
  outputFile: string;
}

export const generateJsonFile = <T>(props: IGenerateJsonFileProps<T>) => {
  getLog().i(`Creating ${props.outputFile}`);

  const outputFile = path.join(getBotPath(), props.outputFile);
  fs.writeFileSync(outputFile, JSON.stringify(props.items, null, 2));
};
