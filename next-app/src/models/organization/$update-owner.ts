'server only';

import { db } from '@/packages/db';
import { OrganizationTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';

export const updateOrganizationOwner = async (
  organizationId: string,
  newOwnerId: string
) =>
  await db
    .update(OrganizationTable)
    .set({ ownerId: newOwnerId })
    .where(eq(OrganizationTable.id, organizationId))
    .returning();
