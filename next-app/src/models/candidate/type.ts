import { CandidateTable } from '@/packages/db/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const zCandidateSelect = createSelectSchema(CandidateTable);

export const zCandidateCreate = createInsertSchema(CandidateTable);

export type Candidate = z.infer<typeof zCandidateSelect>;
export type CandidateInput = z.infer<typeof zCandidateCreate>;

export type CandidateUpdate = Omit<
  z.infer<typeof zCandidateSelect>,
  'organizationId' | 'resume'
>;
