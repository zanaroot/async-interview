'use server';

import { getStorageUrlByName } from '@/lib/files';
import { filesImageValidator } from '@/lib/image';
import { insertImage } from '@/models/image/$insert-image';
import {
  convertFileToBuffer,
  generateSafeName,
  uploadToS3,
} from '@/packages/minio';

export const uploadImageMutation = async (files: File[]) => {
  const validatedFiles = filesImageValidator.parse(files);
  const names: string[] = [];

  for (const file of validatedFiles) {
    const safename = generateSafeName();
    const buffer = await convertFileToBuffer(file);

    await uploadToS3(safename, buffer);

    const url = getStorageUrlByName(safename);

    names.push(url);
  }

  const images = await insertImage(names.map((url) => ({ url })));

  return images;
};
