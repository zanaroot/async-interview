import {
  InterviewQuestionTable,
  QuestionTable,
  InterviewTable,
} from '@/packages/db/schemas';
import type { DBType } from '../Core';
import { Core } from '../Core';
import type { InsertInterviewQuestion, InsertQuestion } from './type';
import { eq, and } from 'drizzle-orm';

export class QuestionModel extends Core {
  constructor(ctx?: DBType) {
    super(ctx);
  }

  create = async (data: InsertQuestion[]) => {
    const question = await this.db
      .insert(QuestionTable)
      .values(data)
      .returning();

    return question;
  };

  createInterviewRelation = async (data: InsertInterviewQuestion[]) => {
    const interviewQuestions = await this.db
      .insert(InterviewQuestionTable)
      .values(data)
      .returning();

    return interviewQuestions;
  };

  getLowestPendingQuestion = async (token: string) => {
    const [result] = await this.db
      .select()
      .from(InterviewQuestionTable)
      .leftJoin(
        QuestionTable,
        eq(InterviewQuestionTable.questionId, QuestionTable.id)
      )
      .leftJoin(
        InterviewTable,
        eq(InterviewQuestionTable.interviewId, InterviewTable.id)
      )
      .where(
        and(
          eq(InterviewTable.token, token),
          eq(InterviewQuestionTable.status, 'pending')
        )
      )
      .orderBy(QuestionTable.order)
      .limit(1);

    return result || null;
  };
}
