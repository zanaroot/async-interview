'use server';

import { getInterviewByToken } from '@/models/interviewcandidat/$verif-status-token';

export const interviewByToken = async (token: string) => {
  const interview = await getInterviewByToken(token);

  return interview;
};
