'server only';

import { db } from '@/packages/db';

export const getOneOrganizationByUserId = async (userId: string) => {
  const result = await db.query.OrganizationUserTable.findFirst({
    where: (q, { eq }) => eq(q.userId, userId),
  });

  return result;
};
