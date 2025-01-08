import { InterviewTable } from '@/packages/db/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const zInterviewSelect = createSelectSchema(InterviewTable);
export const zInterviewInsert = createInsertSchema(InterviewTable);

export type SelectInterview = z.infer<typeof zInterviewSelect>;
export type InsertInterview = z.infer<typeof zInterviewInsert>;
