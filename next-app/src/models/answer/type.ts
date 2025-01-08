import type { z } from 'zod';
import { AnswerTable } from '@/packages/db/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const zAnswerSelect = createSelectSchema(AnswerTable);
export const zAnswerCreate = createInsertSchema(AnswerTable);

export type Answer = z.infer<typeof zAnswerSelect>;
export type AnswerInput = Omit<
  z.infer<typeof zAnswerCreate>,
  'id' | 'createdAt'
>;
