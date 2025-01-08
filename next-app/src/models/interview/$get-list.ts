'server only';

import { db } from '@/packages/db';

export const getList = async (
  organizationId: string,
  limit: number,
  offset: number
) =>
  db.query.InterviewTable.findMany({
    where: (q, { eq }) => eq(q.organizationId, organizationId),
    with: {
      candidate: true,
      organization: true,
    },
    limit: limit,
    offset: offset,
  });
