'server only';

import { db } from '@/packages/db';
import { UserOrganizationInviteTable } from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';

export const updateExpirationDateInvitation = async (
  id: string,
  expiresAt: Date
) =>
  db
    .update(UserOrganizationInviteTable)
    .set({ expiresAt })
    .where(eq(UserOrganizationInviteTable.id, id))
    .returning();
