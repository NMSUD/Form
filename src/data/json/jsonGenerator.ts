import fs from 'fs';
import path from 'path';

import { IApiSegment } from '@constants/api';
import { getBotPath } from '@services/internal/configService';

interface IGenerateJsonFileProps<T> {
  items: Array<T>;
  outputFile: keyof IApiSegment;
}

export const generateJsonFile = <T>(props: IGenerateJsonFileProps<T>) => {
  const outputFile = props.outputFile + '.json';

  const outputFilePath = path.join(getBotPath(), outputFile);
  fs.writeFileSync(outputFilePath, JSON.stringify(props.items, null, 2));
};
