'server only';

import { db } from '@/packages/db';
import { UserOrganizationInviteTable } from '@/packages/db/schemas';

export const inviteUser = async (email: string, organizationId: string) =>
  db
    .insert(UserOrganizationInviteTable)
    .values({ email, organizationId })
    .returning();
