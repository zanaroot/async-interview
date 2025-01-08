'use server';

import { db } from '@/packages/db';
import { InterviewModel } from '@/models/interview';

export const updateStatusToOngoingMutation = async (interviewId: number) => {
  const interviewModel = new InterviewModel(db);
  const t = await interviewModel.updateStatusToOngoing(interviewId);
  return t;
};
