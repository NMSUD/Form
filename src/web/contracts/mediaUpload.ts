import { IImageParams } from '@helpers/imageHelper';

export enum MediaUploadType {
  File,
  ImageUrl,
  VideoUrl,
}

export interface IMediaUpload {
  type: MediaUploadType;
  url: string;
  file?: File;
  imageDetails?: IImageParams;
}
