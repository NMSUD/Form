export interface IProcessedRecord<T> {
  persistence: T;
  needsUpdating: boolean;
}
