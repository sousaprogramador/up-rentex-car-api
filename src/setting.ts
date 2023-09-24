import * as dotenv from 'dotenv';
dotenv.config();

export const APP_PORT = process.env.APP_PORT;
export const JWT_CONSTANTS = process.env.AWS_BUCKET_REGION;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
export const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID;
export const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY;
