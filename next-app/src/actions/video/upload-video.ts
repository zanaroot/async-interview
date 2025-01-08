'use server';

import { getStorageUrlByName } from '@/lib/files';
import { generateSafeName, uploadToS3 } from '@/packages/minio';

export const uploadVideoMuation = async (file: Blob) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const safename = generateSafeName('.webm');

  await uploadToS3(safename, buffer);

  return getStorageUrlByName(safename);
};
