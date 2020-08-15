import { Storage } from '@google-cloud/storage';
import config from '../config';

const storage = new Storage({
  credentials: {
    client_email: config.google.storageBucketClientEmail,
    private_key: config.google.storageBucketPrivateKey,
  },
  projectId: config.google.googleConsoleProjectId,
});

export default storage;
