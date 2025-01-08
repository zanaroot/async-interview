'use server';

import { AnswerModel } from '@/models/answer';
import { db } from '@/packages/db';

export const getAnswersQuery = async (interviewId: number) => {
  const t = await db.transaction(async (ctx) => {
    const answerModel = new AnswerModel(ctx);

    const answers = await answerModel.getAnswers(interviewId);

    return answers;
  });

  return t;
};
