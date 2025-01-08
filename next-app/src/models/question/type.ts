import { InterviewQuestionTable, QuestionTable } from '@/packages/db/schemas';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const zInsertQuestion = createInsertSchema(QuestionTable, {
  value: z.string().min(1),
});

export const zInsertInterviewQuestion = createInsertSchema(
  InterviewQuestionTable
);

export type InsertQuestion = z.infer<typeof zInsertQuestion>;
export type InsertInterviewQuestion = z.infer<typeof zInsertInterviewQuestion>;
