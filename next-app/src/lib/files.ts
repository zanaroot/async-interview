import { env } from '@/env';

export const getStorageUrlByName = (name: string) =>
  `http${env.MINIO_SSL === 'true' ? 's' : ''}://${env.MINIO_EXTERNAL_DOMAIN}:${env.MINIO_PORT ?? 9000}/${env.MINIO_BUCKET_NAME}/${name}`;

export const getSafeNameFromUrl = (url: string) => {
  const urls = url.split(`/${env.MINIO_BUCKET_NAME}/`);

  return urls[1];
};
