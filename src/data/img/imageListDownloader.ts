import { getApiFileService } from '@services/internal/apiFileService';
import { getLog } from '@services/internal/logService';

export interface IImageDownloadRequest {
  url?: string | null;
  folder: string;
  fileName: string;
  onSuccess: (imgPath: string) => void;
}
export const imageListDownloader = async (imagesToDownload: Array<IImageDownloadRequest>) => {
  for (const imgToDownload of imagesToDownload) {
    if (imgToDownload.url == null) continue;
    const imgDownloadResult = await getApiFileService().downloadFileFromUrl(
      imgToDownload.url,
      imgToDownload.folder,
      imgToDownload.fileName,
    );
    if (imgDownloadResult.isSuccess) {
      imgToDownload.onSuccess(imgDownloadResult.value);
    }
  }
};
