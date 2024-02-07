import fs from 'fs';
import path from 'path';

import { getBotPath } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { IApiSegment } from '@constants/api';

interface IGenerateJsonFileProps<T> {
  items: Array<T>;
  outputFile: keyof IApiSegment;
}

export const generateJsonFile = <T>(props: IGenerateJsonFileProps<T>) => {
  const outputFile = props.outputFile + '.json';
  getLog().i(`Creating ${outputFile}`);

  const outputFilePath = path.join(getBotPath(), outputFile);
  fs.writeFileSync(outputFilePath, JSON.stringify(props.items, null, 2));
};
