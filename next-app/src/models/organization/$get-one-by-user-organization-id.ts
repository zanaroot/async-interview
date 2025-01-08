'server only';

import { db } from '@/packages/db';

export const getOneByUserOrganizationId = async (organizationId: string) => {
  const result = await db.query.OrganizationTable.findFirst({
    where: (q, { eq }) => eq(q.id, organizationId),
    with: {
      owner: true,
    },
  });

  return result;
};
