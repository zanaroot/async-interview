'server only';

import { db } from '@/packages/db';
import type { Organization } from './type';

export const getOrganization = async (data: Organization) => {
  const result = await db.query.OrganizationTable.findFirst({
    where: (q, { eq }) => eq(q.id, data.id),
  });
  return result;
};
