import { HtmlImageReadEvent } from '@contracts/event';

export interface IImageParams {
  width: number;
  height: number;
  fileSize: number;
  fileExtension: string;
}

export const getImageParams = (file: File): Promise<IImageParams> => {
  const fileExtension = file.name?.split?.('.')?.pop?.() ?? '.png';
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e: HtmlImageReadEvent) => {
      const image = new Image();
      if (e.target == null || e.target.result == null) {
        reject('e.target.result is null');
        return;
      }
      image.src = e.target.result as string;
      await image.decode();

      resolve({
        width: image.width,
        height: image.height,
        fileSize: file.size,
        fileExtension,
      });
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};
