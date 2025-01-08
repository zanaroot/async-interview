'server only';

import { db } from '@/packages/db';
import { OrganizationUserTable } from '@/packages/db/schemas';
import { and, eq } from 'drizzle-orm';

export const userLeaveOrganization = async (
  userId: string,
  organizationId: string
) => {
  await db
    .delete(OrganizationUserTable)
    .where(
      and(
        eq(OrganizationUserTable.userId, userId),
        eq(OrganizationUserTable.organizationId, organizationId)
      )
    )
    .returning();
};
