'use server';

import { getSafeNameFromUrl, getStorageUrlByName } from '@/lib/files';
import { updateResume } from '@/models/candidate/$update-resume';
import {
  convertFileToBuffer,
  deleteFromS3,
  generateSafeName,
  uploadToS3,
} from '@/packages/minio';
import { actionSessionGuard } from '@/server-functions/session';
import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_PDF_TYPE = 'application/pdf';
const FILE_NAME_MAX_LENGTH = 255;

const validateFileSize = (file: File): boolean => {
  return file.size <= MAX_FILE_SIZE;
};

const validateFileType = (file: File): boolean =>
  file.type === ACCEPTED_PDF_TYPE;

const validateFileName = (file: File): boolean =>
  file.name.includes('..') === false &&
  file.name.length <= FILE_NAME_MAX_LENGTH;

const filePDFValidator = z
  .instanceof(File, { message: 'File is required' })
  .refine(validateFileSize, { message: 'File size exceeds the limit of 5MB' })
  .refine(validateFileType, { message: 'Only PDF files are accepted' })
  .refine(validateFileName, { message: 'Invalid file name' });

export const uploadResumeMutation = async ({
  candidateId,
  file,
}: {
  candidateId: number;
  file: File;
}) => {
  await actionSessionGuard();

  const validatedFile = filePDFValidator.parse(file);

  const safename = generateSafeName('.pdf');

  const buffer = await convertFileToBuffer(validatedFile);

  await uploadToS3(safename, buffer);

  const url = getStorageUrlByName(safename);

  const { candidate, old_resume } = await updateResume(candidateId, url);

  if (old_resume) {
    const oldSafeName = getSafeNameFromUrl(old_resume);
    await deleteFromS3(oldSafeName);
  }

  return candidate;
};
