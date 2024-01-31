export interface IFormWithFiles {
  [p: string]: IFile;
}

export interface IFile {
  filepath: string;
  newFilename: string;
  mimetype: string;
}
