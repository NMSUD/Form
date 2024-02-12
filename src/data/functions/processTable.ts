import { IApiModule, IRecordRequirements } from '@api/module/baseModule';
import { Mapper } from '@contracts/mapper';
import { getConfig } from '@services/internal/configService';
import { getLog } from '@services/internal/logService';
import { IGetImageForRecord } from 'data/contracts/image';
import { fetchImagesForTable } from 'data/img/baseImgDownloader';
import { generateJsonFile } from 'data/json/jsonGenerator';
import { stripPropertiesFromObject } from 'data/mapper/stripProperties';

export const processTable = async <TD extends {}, TF, TP extends IRecordRequirements>(tableProps: {
  module: IApiModule<TD, TF, TP>;
  dataEnhancer: Mapper<TD, Promise<unknown>>;
  processItemImgs: (props: IGetImageForRecord<TP>) => Promise<TP>;
}) => {
  getLog().i(`Fetching all the data for table '${tableProps.module.segment}'`);

  getLog().i('\tFetching all rows');
  const tableResult = await tableProps.module.readAllRecords();
  if (tableResult.isSuccess == false) return throwError(tableResult.errorMessage);

  getLog().i('\tFetch images per row');
  const updatedTable = await fetchImagesForTable({
    items: tableResult.value,
    imageFolder: tableProps.module.segment,
    imgBaseUrl: getConfig().getNmsUdBaseImgUrl(),
    processItemImgs: tableProps.processItemImgs,
  });

  const enrichedDtoRows: Array<unknown> = [];
  for (const tableRow of updatedTable) {
    const dto = tableProps.module.mapPersistenceToDto(tableRow);
    const enhancedDto = await tableProps.dataEnhancer(dto);
    enrichedDtoRows.push(enhancedDto);
  }

  getLog().i('\tWriting base jsonFiles');
  generateJsonFile({
    items: enrichedDtoRows.map((edr) => stripPropertiesFromObject(edr as TD)),
    outputFile: tableProps.module.segment,
  });
};

const throwError = (errMsg: string) => {
  console.error(errMsg);
  return 1;
};
