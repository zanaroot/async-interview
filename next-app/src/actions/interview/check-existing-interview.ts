'use server';

import { interviewByToken } from '@/server-functions/interview-by-token';
import { db } from '@/packages/db';
import { InterviewModel } from '@/models/interview';
import { QuestionModel } from '@/models/question';

export const checkExistingInterview = async (token: string) => {
  const interviewModel = new InterviewModel(db);
  const questionModel = new QuestionModel(db);

  const t = await interviewByToken(token);

  if (!t) {
    return null;
  }

  if (t.status !== 'ongoing') {
    await interviewModel.updateStatusToPending(t.id);
  }

  if (t.status === 'ongoing') {
    const questions = await questionModel.getLowestPendingQuestion(token);

    if (!questions) {
      await interviewModel.updateStatusToDone(t.id);
      throw 'You have already answered all the questions';
    }
  }

  return t;
};
