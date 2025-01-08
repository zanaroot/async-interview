'server only';

import { db } from '@/packages/db';

export const existInvitation = async (email: string, organizationId: string) =>
  db.query.UserOrganizationInviteTable.findFirst({
    where: (q, { eq, and }) =>
      and(eq(q.email, email), eq(q.organizationId, organizationId)),
  });
