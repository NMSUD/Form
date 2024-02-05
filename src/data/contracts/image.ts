export interface IGetImageForRecord<T> {
  persistence: T;
  imageFolder: string;
  imagePath: string;
  imgBaseUrl: string;
}
