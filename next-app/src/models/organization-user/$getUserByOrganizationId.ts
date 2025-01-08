import { db } from '@/packages/db';

export const getUserByOrganizationId = async (organizationId: string) => {
  const result = await db.query.OrganizationUserTable.findMany({
    where: (q, { eq }) => eq(q.organizationId, organizationId),
    with: {
      user: true,
    },
  });

  return result;
};
