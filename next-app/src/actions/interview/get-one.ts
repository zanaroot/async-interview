'use server';

import { getOne } from '@/models/interview';

export const oneInterviewQuery = async (id: number) => {
  const result = await getOne(id);
  return result;
};
