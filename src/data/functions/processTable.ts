import { IApiModule, IRecordRequirements } from '@api/types/baseModule';
import { Mapper } from '@contracts/mapper';
import { Result } from '@contracts/resultWithValue';
import { getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { IGetImageForRecord } from '../contracts/image';
import { fetchImagesForTable } from '../img/logic/baseImgDownloader';
import { generateJsonFile } from '../json/jsonGenerator';
import { stripPropertiesFromObject } from '../mapper/stripProperties';
import { IProcessedRecord } from 'data/contracts/processedRecord';

export const processTable = async <TD extends {}, TF, TP extends IRecordRequirements>(tableProps: {
  module: IApiModule<TD, TF, TP>;
  dataEnhancer: Mapper<TD, Promise<unknown>>;
  processItemImgs: (props: IGetImageForRecord<TP>) => Promise<IProcessedRecord<TP>>;
  updateItemInDb: (props: TP) => Promise<Result>;
}) => {
  getLog().i(`Fetching all the data for table '${tableProps.module.segment}'`);

  getLog().i('\tFetching all rows');
  const tableResult = await tableProps.module.readAllRecords();
  if (tableResult.isSuccess == false) return throwError(tableResult.errorMessage);

  getLog().i('\tDownloading images per row');
  const updatedTable = await fetchImagesForTable({
    items: tableResult.value,
    imageFolder: tableProps.module.segment,
    imgBaseUrl: getConfig().getNmsUdFormDataUrl(),
    processItemImgs: tableProps.processItemImgs,
    updateItemInDb: tableProps.updateItemInDb,
  });

  getLog().i('\tEnriching data per row');
  const enrichedDtoRows: Array<unknown> = [];
  for (const tableRow of updatedTable) {
    const dto = tableProps.module.mapPersistenceToDto(tableRow);
    const enhancedDto = await tableProps.dataEnhancer(dto);
    enrichedDtoRows.push(enhancedDto);
  }

  getLog().i(`\tWriting ${tableProps.module.segment}.json file`);
  generateJsonFile({
    items: enrichedDtoRows.map((edr) => stripPropertiesFromObject(edr as TD)),
    outputFile: tableProps.module.segment,
  });
  getLog().i('');
};

const throwError = (errMsg: string) => {
  console.error(errMsg);
  return 1;
};
