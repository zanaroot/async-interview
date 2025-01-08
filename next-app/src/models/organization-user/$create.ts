'serer only';

import { db } from '@/packages/db';
import { OrganizationUserTable } from '@/packages/db/schemas';

export const createOrganizationUser = async (
  userId: string,
  organizationId: string
) =>
  db
    .insert(OrganizationUserTable)
    .values({ userId, organizationId })
    .returning();
