export type Mapper<TS, TD> = (source: TS) => TD;

export type DtoAndImageMapperToNewPersistence<TS, TI, TD> = (
  source: TS,
  image: TI,
) => Omit<TD, 'id'>;
