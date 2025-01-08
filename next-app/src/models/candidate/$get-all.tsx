'server only';

import { db } from '@/packages/db';

export const getAll = async (organizationId: string) =>
  db.query.CandidateTable.findMany({
    where: (candidate, { eq }) => eq(candidate.organizationId, organizationId),
  });
