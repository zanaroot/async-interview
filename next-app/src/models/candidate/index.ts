export * from './$get-all';
import { Core, type DBType } from '../Core';
import { db } from '@/packages/db';
import { CandidateTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';
import type { CandidateUpdate } from './type';

export class CandidateModel extends Core {
  constructor(ctx?: DBType) {
    super(ctx);
  }

  update = async (candidatevalues: CandidateUpdate) =>
    await db
      .update(CandidateTable)
      .set(candidatevalues)
      .where(eq(CandidateTable.id, candidatevalues.id))
      .returning();
}
