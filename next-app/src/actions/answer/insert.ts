'use server';

import { AnswerModel } from '@/models/answer';
import type { AnswerInput } from '@/models/answer/type';
import { db } from '@/packages/db';

export const insertAnswerMuation = async ({
  questionId,
  answerData,
  interviewId,
}: {
  questionId: string;
  answerData: AnswerInput;
  interviewId: number;
}) => {
  const t = await db.transaction(async (ctx) => {
    const answerModel = new AnswerModel(ctx);

    const [answer] = await answerModel.create(answerData);

    const updatedQuestion = await answerModel.update(
      questionId,
      answer?.id,
      interviewId
    );

    return {
      answer,
      updatedQuestion,
    };
  });

  return t;
};
