export interface IImageProcessingProps {
  input:
    | Buffer
    | ArrayBuffer
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    | Uint16Array
    | Int16Array
    | Uint32Array
    | Int32Array
    | Float32Array
    | Float64Array
    | string;
}

export interface IImageProcessingOutputProps {
  outputType?: 'jpg' | 'jpeg' | 'png';
}

export interface IImageMetaDataProps {
  format?: string;
  size?: number;
  width?: number;
  height?: number;
  hasAlpha?: boolean;
  compression?: 'av1' | 'hevc';
  resolutionUnit?: 'inch' | 'cm' | undefined;
}

export interface IImageResizeProps extends IImageProcessingProps {
  width?: number;
  height?: number;
}
