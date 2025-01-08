'server only';

import { db } from '@/packages/db';
import {
  OrganizationTable,
  SessionTable,
  UserTable,
} from '@/packages/db/schemas';
import { eq } from 'drizzle-orm';
import type { SessionValidationResult } from './type';

export const validateSessionToken = async (
  token: string
): Promise<SessionValidationResult> => {
  const [result] = await db
    .select({
      user: UserTable,
      session: SessionTable,
      organization: OrganizationTable,
    })
    .from(SessionTable)
    .innerJoin(UserTable, eq(SessionTable.userId, UserTable.id))
    .leftJoin(
      OrganizationTable,
      eq(SessionTable.organizationId, OrganizationTable.id)
    )
    .where(eq(SessionTable.id, token));

  if (!result) {
    return { session: null, user: null, organization: null };
  }

  const { user, session, organization } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(SessionTable).where(eq(SessionTable.id, session.id));
    return { session: null, user: null, organization: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(SessionTable)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(SessionTable.id, session.id));
  }

  const { password: _, ...rest } = user;

  return { session, user: rest, organization };
};
