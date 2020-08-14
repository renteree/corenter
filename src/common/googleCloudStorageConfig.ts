import { Storage } from '@google-cloud/storage';
import path from 'path';
import config from '../config';

const serviceKey = path.join(__dirname, `../../config/${config.google.cloudStorageKeyName}`);

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'renteree',
});

export default storage;
