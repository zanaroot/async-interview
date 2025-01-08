'server only';

import { db } from '@/packages/db';

export const organizationUser = async (userId: string) => {
  const result = await db.query.OrganizationUserTable.findMany({
    where: (q, { eq }) => eq(q.userId, userId),
    with: {
      organization: true,
    },
  });

  return result;
};
