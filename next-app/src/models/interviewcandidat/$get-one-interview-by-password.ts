'server only';

import { db } from '@/packages/db';

export const getOneInterviewByPassword = async (password: string) => {
  return await db.query.InterviewTable.findFirst({
    where: (q, { eq, and, gt, ne }) =>
      and(
        eq(q.password, password),
        ne(q.status, 'done'),
        gt(q.expiresAt, new Date())
      ),
  });
};
