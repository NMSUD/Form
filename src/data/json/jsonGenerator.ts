import { getLog } from '@services/internal/logService';

interface IGenerateJsonFileProps<T> {
  items: Array<T>;
  outputFile: string;
}

export const generateJsonFile = <T>(props: IGenerateJsonFileProps<T>) => {
  getLog().i(`Creating ${props.outputFile}`);
};
