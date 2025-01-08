'use server';

import { db } from '@/packages/db';
import { QuestionModel } from '@/models/question';

export const questionsByInterviewIdQuery = async (token: string) => {
  const questionModel = new QuestionModel(db);

  const questions = await questionModel.getLowestPendingQuestion(token);

  return questions;
};
