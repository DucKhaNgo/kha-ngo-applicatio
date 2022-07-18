// required environment variables

const config = {
  stage: process.env.NODE_ENV,
  port: process.env.PORT,
  version: '0.0.1',
  jwtSecret: process.env.JWT_SECRET,
  db: process.env.DB_CON,
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
  s3BucketName: process.env.AWS_S3_BUCKET_NAME,
};

module.exports = config;
