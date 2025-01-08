'server only';

import { db } from '@/packages/db';

export const existEmailInvitation = async (email: string) =>
  db.query.UserOrganizationInviteTable.findMany({
    where: (q, { eq }) => eq(q.email, email),
  });
