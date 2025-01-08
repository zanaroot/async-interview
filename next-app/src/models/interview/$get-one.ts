'server only';

import { db } from '@/packages/db';

export const getOne = async (id: number) => {
  const result = await db.query.InterviewTable.findFirst({
    where: (q, { eq }) => eq(q.id, id),
    with: {
      candidate: true,
      organization: true,
    },
  });

  return result;
};
