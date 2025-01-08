'server only';

import { db } from '@/packages/db';
import { CandidateTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';

export const updateResume = async (id: number, url: string) => {
  const candidateResume = await db.query.CandidateTable.findFirst({
    columns: {
      resume: true,
    },
    where: eq(CandidateTable.id, id),
  });

  const [result] = await db
    .update(CandidateTable)
    .set({ resume: url })
    .where(eq(CandidateTable.id, id))
    .returning();

  return {
    candidate: result,
    old_resume: candidateResume?.resume,
  };
};
