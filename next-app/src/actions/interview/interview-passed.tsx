'use server';

import { InterviewModel } from '@/models/interview';
import { actionOrgSessionGuard } from '@/server-functions/session';

export const interviewPassedQuery = async () => {
  const session = await actionOrgSessionGuard();

  const interviewModel = new InterviewModel();

  const interviewPassed = await interviewModel.getInterviewPassed(
    session.organizationId
  );

  return interviewPassed;
};
