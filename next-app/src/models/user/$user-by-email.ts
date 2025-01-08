'server only';

import { db } from '@/packages/db';

export const userByEmailOrByUsername = (emailOrUsername: string) =>
  db.query.UserTable.findFirst({
    where: (q, { eq, or }) =>
      or(eq(q.email, emailOrUsername), eq(q.username, emailOrUsername)),
  });
