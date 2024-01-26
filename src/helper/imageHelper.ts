export interface IImageParams {
    width: number;
    height: number;
    fileSize: number;
    fileExtension: string;
}

export const getImageParams = (file: File): Promise<IImageParams> => {
    const fileExtension = file.name?.split?.('.')?.pop?.() ?? '.any';
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = async (e: any) => {
            const image = new Image()
            image.src = e.target.result
            await image.decode();

            resolve({
                width: image.width,
                height: image.height,
                fileSize: file.size,
                fileExtension,
            })
        }
        reader.onerror = (e: any) => reject(e);
        reader.readAsDataURL(file);
    })
}