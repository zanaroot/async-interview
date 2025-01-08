'server only';

import { db } from '@/packages/db';

export const getCandidateById = async (id: number, organizationId: string) =>
  db.query.CandidateTable.findFirst({
    where: (candidate, { eq, and }) =>
      and(eq(candidate.id, id), eq(candidate.organizationId, organizationId)),
  });
