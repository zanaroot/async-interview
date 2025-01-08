'server only';

import { db } from '@/packages/db';
import { OrganizationTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';

export const deleteOrganization = async (id: string) => {
  await db
    .delete(OrganizationTable)
    .where(eq(OrganizationTable.id, id))
    .returning();
};
