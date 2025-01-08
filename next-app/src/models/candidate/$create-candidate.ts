'server only';

import { db } from '@/packages/db';
import { CandidateTable } from '@/packages/db/schemas';
import type { CandidateInput } from './type';

export const createCandidate = async (candidate: CandidateInput) =>
  db.insert(CandidateTable).values(candidate).returning();
