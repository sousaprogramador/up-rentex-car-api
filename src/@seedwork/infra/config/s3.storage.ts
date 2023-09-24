import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  AWS_BUCKET_REGION,
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY,
} from '../../../setting';

const s3Config = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
  },
});

const multerConfig = {
  storage: multerS3({
    s3: s3Config,
    bucket: process.env.AWS_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
};

export default multerConfig;
