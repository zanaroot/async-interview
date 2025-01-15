'use server';

import { InterviewModel } from '@/models/interview';
import { actionOrgSessionGuard } from '@/server-functions/session';

export const allinterviewQuery = async () => {
  const session = await actionOrgSessionGuard();

  const interviewModel = new InterviewModel();

  const allinterview = await interviewModel.getallInterview(
    session.organizationId
  );

  return allinterview;
};
