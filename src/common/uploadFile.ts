import gc from './googleCloudStorageConfig';
import config from '../config';
import reportError from './reportError';

const bucket = gc.bucket(config.google.bucketName as string);

type File = {
  fileName: string,
  buffer: Buffer
}

const uploadImage = (file: File) : Promise<string> => new Promise((resolve, reject) => {
  const { fileName, buffer } = file;

  const blob = bucket.file(fileName.replace(/ /g, '_'));
  const blobStream = blob.createWriteStream({
    resumable: false,
  });
  blobStream
    .on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    })
    .on('error', (e) => {
      reject(reportError(e));
    })
    .end(buffer);
});

export default uploadImage;
